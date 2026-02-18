import axios from 'axios';
import { PUBLIC_API_CONFIG } from './apiConfig';

const publicApiClient = axios.create(PUBLIC_API_CONFIG);

export default publicApiClient;
