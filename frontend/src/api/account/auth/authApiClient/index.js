import apiClient from './httpClient';
import {
  setupRequestInterceptors,
  setupResponseInterceptors,
} from './httpClientInterceptors';

setupRequestInterceptors(apiClient);
setupResponseInterceptors(apiClient);

export default apiClient;
