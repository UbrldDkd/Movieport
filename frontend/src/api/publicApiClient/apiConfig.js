export const API_BASE_URL = 'http://127.0.0.1:8000';

export const PUBLIC_API_CONFIG = {
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
};