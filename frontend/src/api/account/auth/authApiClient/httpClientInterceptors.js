// Config
import { COOKIE_NAMES, AUTH_HEADER_PREFIX } from './apiConfig';

// Helpers
import { readCookie } from './getCookie';

import { refreshAccessToken } from './accessTokenRefresher';

export function setupRequestInterceptors(apiClient) {
  apiClient.interceptors.request.use(
    (requestConfig) => {
      attachAccessTokenToRequest(requestConfig);
      return requestConfig;
    },
    (error) => Promise.reject(error)
  );
}

export function setupResponseInterceptors(apiClient) {
  apiClient.interceptors.response.use(
    (response) => response,
    handleResponseError
  );
}

function attachAccessTokenToRequest(requestConfig) {
  const accessToken = readCookie(COOKIE_NAMES.ACCESS_TOKEN);

  if (accessToken) {
    requestConfig.headers.Authorization = `${AUTH_HEADER_PREFIX}${accessToken}`;
  }
}

async function handleResponseError(error) {
  return await attemptTokenRefreshOnUnauthorized(error);
}

async function attemptTokenRefreshOnUnauthorized(error) {
  const originalRequest = error.config;

  if (shouldAttemptTokenRefresh(error, originalRequest)) {
    markRequestAsRefreshed(originalRequest);
    return await refreshAccessToken(originalRequest);
  }

  return Promise.reject(error);
}

function shouldAttemptTokenRefresh(error, originalRequest) {
  return (
    error.response?.status === 401 && !originalRequest._hasAttemptedRefresh
  );
}

function markRequestAsRefreshed(requestConfig) {
  requestConfig._hasAttemptedRefresh = true;
}
