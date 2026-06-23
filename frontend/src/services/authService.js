import { api } from "./api";

export const register = async (values) => {
  const response = await api.post("/auth/register", values);
  return response.data;
};
export const login = async (values) => {
  const response = await api.post("/auth/login", values);
  return response.data;
};
export const profile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};
