import { refreshAccessToken } from './accessTokenRefresher';

export function setupRequestInterceptors(apiClient) {
  apiClient.interceptors.request.use(
    (requestConfig) => requestConfig,
    (error) => Promise.reject(error)
  );
}

export function setupResponseInterceptors(apiClient) {
  apiClient.interceptors.response.use(
    (response) => response,
    handleResponseError
  );
}

async function handleResponseError(error) {
  return attemptTokenRefreshOnUnauthorized(error);
}

async function attemptTokenRefreshOnUnauthorized(error) {
  const originalRequest = error.config;

  if (shouldAttemptTokenRefresh(error, originalRequest)) {
    markRequestAsRefreshed(originalRequest);
    return refreshAccessToken(originalRequest);
  }

  return Promise.reject(error);
}

function shouldAttemptTokenRefresh(error, originalRequest) {
  return (
    error.response?.status === 401 &&
    !originalRequest?._hasAttemptedRefresh
  );
}

function markRequestAsRefreshed(requestConfig) {
  requestConfig._hasAttemptedRefresh = true;
}