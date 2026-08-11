// Default to '/api' in production when VITE_API_URL is not set so Netlify
// can proxy requests under the same origin.
const defaultBase = import.meta.env.PROD ? '/api' : 'http://127.0.0.1:8000';
export const API_BASE_URL = import.meta.env.VITE_API_URL || defaultBase;

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 30000,
};
