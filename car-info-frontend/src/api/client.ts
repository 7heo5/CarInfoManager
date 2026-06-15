import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5257";

export function apiUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});
