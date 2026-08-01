export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const PUBLIC_API_CONFIG = {
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
};
