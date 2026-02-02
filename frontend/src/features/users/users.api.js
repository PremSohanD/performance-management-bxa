import httpClient from "../../services/httpClient";

export const getUsersApi = (params) => {
  return httpClient.get("/api/users", { params });
};

export const getUserByIdApi = (id) => {
  return httpClient.get(`/api/users/${id}`);
};

export const createUserApi = (payload) => {
  return httpClient.post("/api/users", payload);
};
