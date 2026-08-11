import axios from 'axios';
import apiClient from './httpClient';
import { API_BASE_URL } from './apiConfig';

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
      addWaitingRequest(() => {
        resolve(retryOriginalRequest(originalRequest));
      });
    });
  }

  beginTokenRefresh();

  try {
    await apiClient.post(`/accounts/refresh/`, {});

    retryAllWaitingRequestsWithNewToken();

    completeTokenRefresh();

    return retryOriginalRequest(originalRequest);
  } catch (error) {
    completeTokenRefresh();
    redirectToLoginPage();
    return Promise.reject(error);
  }
}

function retryOriginalRequest(request) {
  // Use the shared apiClient so baseURL and interceptors are preserved
  return apiClient({
    ...request,
    withCredentials: true,
  });
}

function redirectToLoginPage() {
  window.location.href = '/';
}
