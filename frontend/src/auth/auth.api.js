import httpClient from "../services/httpClient";

export const loginApi = (payload) => {
  return httpClient.post("/api/auth/login", payload);
};
