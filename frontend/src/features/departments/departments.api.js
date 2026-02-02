import httpClient from "../../services/httpClient";

export const getDepartmentsApi = () => {
  return httpClient.get("/api/departments");
};

export const createDepartmentApi = (payload) => {
  return httpClient.post("/api/departments", payload);
};
