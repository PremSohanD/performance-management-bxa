import { getUsersApi, createUserApi  } from "./users.api";


const initialState = {
  users: [],
  loading: false,
  error: null,
  page: 0,
  size: 5,
  totalPages: 0,
  totalElements: 0
};

let state = { ...initialState };
let listeners = [];

function setState(newState) {
  state = { ...state, ...newState };
  listeners.forEach((l) => l(state));
}

export async function createUser(payload) {
  try {
    setState({ loading: true });

    await createUserApi(payload);

    setState({ loading: false });
  } catch (err) {
    setState({
      error: "Failed to create user",
      loading: false
    });
  }
}

export const usersStore = {
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

export async function fetchUsers(page = 0, size = state.size) {
  try {
    setState({ loading: true });

    const response = await getUsersApi({ page, size });

    setState({
      users: response.data.content || [],
      page: response.data.number,
      size: response.data.size,
      totalPages: response.data.totalPages,
      totalElements: response.data.totalElements,
      loading: false
    });
  } catch (err) {
    setState({
      error: "Failed to load users",
      loading: false
    });
  }
}

