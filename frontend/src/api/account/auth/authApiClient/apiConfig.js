export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 30000,
};