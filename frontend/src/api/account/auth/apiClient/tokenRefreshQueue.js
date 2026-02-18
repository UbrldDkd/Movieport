let refreshInProgress = false;
let requestsWaitingForToken = [];

export function isRefreshRunning() {
  return refreshInProgress;
}

export function startRefresh() {
  refreshInProgress = true;
}

export function endRefresh() {
  refreshInProgress = false;
}

export function queueRequest(retryRequest) {
  requestsWaitingForToken.push(retryRequest);
}

export function retryQueuedRequests(newAccessToken) {
  requestsWaitingForToken.forEach((retry) => retry(newAccessToken));
  requestsWaitingForToken = [];
}
