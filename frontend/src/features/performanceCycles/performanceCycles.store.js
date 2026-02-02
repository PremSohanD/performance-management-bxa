import {
  getCyclesApi,
  createCycleApi,
  startCycleApi,
  closeCycleApi,
  getActiveCycleApi
} from "./performanceCycles.api";

const initialState = {
  cycles: [],
  activeCycle: null,
  loading: false,
  error: null
};

let state = { ...initialState };
let listeners = [];

export const performanceCyclesStore = {
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

//  Load cycles
export async function fetchCycles() {
  try {
    setState({ loading: true });
    const res = await getCyclesApi();
    setState({
      cycles: res.data || [],
      loading: false
    });
  } catch {
    setState({
      error: "Failed to load performance cycles",
      loading: false
    });
  }
}

//  Create cycle
export async function createCycle(payload) {
  await createCycleApi(payload);
  fetchCycles();
}

//  Start cycle
export async function startCycle(id) {
  await startCycleApi(id);
  fetchCycles();
}

//  Close cycle
export async function closeCycle(id) {
  await closeCycleApi(id);
  fetchCycles();
}

export async function fetchActiveCycle() {
  try {
    const res = await getActiveCycleApi();

    if (res.status === 204) {
      setState({ activeCycle: null });
      return;
    }

    setState({ activeCycle: res.data });
  } catch {
    setState({ activeCycle: null });
  }
}

