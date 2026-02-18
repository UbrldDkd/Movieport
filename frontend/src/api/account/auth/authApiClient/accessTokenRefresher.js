// Third-party
import axios from 'axios';

// Config
import { API_BASE_URL, COOKIE_NAMES } from './apiConfig';

// Helpers
import { readCookie } from './getCookie';
import {
  isTokenRefreshInProgress,
  beginTokenRefresh,
  completeTokenRefresh,
  addWaitingRequest,
  retryAllWaitingRequestsWithNewToken,
} from './tokenRefreshQueueManager';

export async function refreshAccessToken(originalRequest) {
  if (isTokenRefreshInProgress()) {
    return new Promise((resolve) => {
      addWaitingRequest((newAccessToken) => {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        resolve(retryOriginalRequest(originalRequest));
      });
    });
  }

  beginTokenRefresh();

  try {
    const refreshToken = readCookie(COOKIE_NAMES.REFRESH_TOKEN);

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    await axios.post(
      `${API_BASE_URL}/accounts/refresh/`,
      { refresh: refreshToken },
      { withCredentials: true }
    );

    const newAccessToken = readCookie(COOKIE_NAMES.ACCESS_TOKEN);

    retryAllWaitingRequestsWithNewToken(newAccessToken);
    completeTokenRefresh();

    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    return retryOriginalRequest(originalRequest);
  } catch (error) {
    completeTokenRefresh();
    redirectToLoginPage();
    return Promise.reject(error);
  }
}

function retryOriginalRequest(request) {
  return axios(request);
}

function redirectToLoginPage() {
  window.location.href = '/';
}
