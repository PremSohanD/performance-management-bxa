import httpClient from "../../services/httpClient";

export const getCyclesApi = () => {
  return httpClient.get("/api/performance-cycles");
};

export const createCycleApi = (payload) => {
  return httpClient.post("/api/performance-cycles", payload);
};

export const startCycleApi = (id) => {
  return httpClient.post(`/api/performance-cycles/${id}/start`);
};

export const closeCycleApi = (id) => {
  return httpClient.post(`/api/performance-cycles/${id}/close`);
};

export const getActiveCycleApi = () => {
  return httpClient.get("/api/performance-cycles/active-cycle");
};
