import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

// Attach token automatically (defensive: ensure headers object exists)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  req.headers = req.headers ?? {};
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth
export const login = (credentials: { email: string; password: string }) =>
  API.post('/auth/login', credentials);

// Vehicles
export const getVehicles = () => API.get("/vehicles");
export const createVehicle = (data: FormData) => API.post("/vehicles", data);
export const updateVehicle = (id: string, data: FormData) => API.put(`/vehicles/${id}`, data);
export const deleteVehicle = (id: string) => API.delete(`/vehicles/${id}`);
