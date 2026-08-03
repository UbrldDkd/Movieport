import axios from 'axios';

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
    await axios.post(
      `${API_BASE_URL}/accounts/refresh/`,
      {},
      {
        withCredentials: true,
      }
    );

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
  return axios({
    ...request,
    withCredentials: true,
  });
}


function redirectToLoginPage() {
  window.location.href = '/';
}