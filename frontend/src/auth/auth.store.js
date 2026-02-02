import { loginApi } from "./auth.api";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

let state = { ...initialState };
let listeners = [];

export const authStore = {
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

export async function login(credentials) {
  try {
    setState({ loading: true, error: null });

    const response = await loginApi(credentials);
    const token = response.data;

    localStorage.setItem("pms_token", token);

    const decoded = jwtDecode(token);

    setState({
      user: {
        id: decoded.userId,
        role: decoded.role,
        loginId: decoded.sub // ⚠️ email (for now)
      },
      token,
      isAuthenticated: true,
      loading: false,
      error: null
    });
  } catch (err) {
    localStorage.removeItem("pms_token");
    setState({
      error: "Invalid credentials",
      loading: false
    });
  }
}

export function logout() {
  localStorage.removeItem("pms_token");
  state = { ...initialState };
  listeners.forEach((l) => l(state));
}

// 🔥 Restore auth on refresh
(function loadAuthFromStorage() {
  const token = localStorage.getItem("pms_token");
  if (!token) return;

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("pms_token");
      return;
    }

    state = {
      ...state,
      user: {
        id: decoded.userId,
        role: decoded.role,
        loginId: decoded.sub
      },
      token,
      isAuthenticated: true
    };

    listeners.forEach((l) => l(state));
  } catch {
    localStorage.removeItem("pms_token");
  }
})();
