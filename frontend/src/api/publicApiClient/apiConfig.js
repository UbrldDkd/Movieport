// Default to '/api' in production when VITE_API_URL is not set so Netlify
// can proxy requests under the same origin.
const defaultBase = import.meta.env.PROD ? '/api' : undefined;
export const API_BASE_URL = import.meta.env.VITE_API_URL || defaultBase;

export const PUBLIC_API_CONFIG = {
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
};
