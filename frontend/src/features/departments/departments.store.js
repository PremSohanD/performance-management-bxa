import { getDepartmentsApi, createDepartmentApi } from "./departments.api";

const initialState = {
  departments: [],
  loading: false,
  error: null
};

let state = { ...initialState };
let listeners = [];

export const departmentsStore = {
  getState() {
    return state;
  },
  subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }
};

function setState(newState) {
  state = { ...state, ...newState };
  listeners.forEach((l) => l(state));
}

export async function fetchDepartments() {
  try {
    setState({ loading: true });

    const res = await getDepartmentsApi();
    setState({
      departments: res.data || [],
      loading: false
    });
  } catch {
    setState({ error: "Failed to load departments", loading: false });
  }
}

export async function createDepartment(payload) {
  await createDepartmentApi(payload);
  fetchDepartments();
}
