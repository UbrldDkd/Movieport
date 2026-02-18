let tokenRefreshInProgress = false;
let waitingRequests = [];

export function isTokenRefreshInProgress() {
  return tokenRefreshInProgress;
}

export function beginTokenRefresh() {
  tokenRefreshInProgress = true;
}

export function completeTokenRefresh() {
  tokenRefreshInProgress = false;
}

export function addWaitingRequest(requestRetryFunction) {
  waitingRequests.push(requestRetryFunction);
}

export function retryAllWaitingRequestsWithNewToken(newAccessToken) {
  waitingRequests.forEach((retryFunction) => retryFunction(newAccessToken));
  waitingRequests = [];
}
