export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  withCredentials: true,

  timeout: 30000,
};

export const COOKIE_NAMES = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

export const AUTH_HEADER_PREFIX = 'Bearer ';
