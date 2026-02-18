// Third-party
import axios from 'axios';

// Config
import { API_CONFIG } from './apiConfig';

const apiClient = axios.create(API_CONFIG);

export default apiClient;
