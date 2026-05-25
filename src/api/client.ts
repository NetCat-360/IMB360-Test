import axios from 'axios';
import Config from 'react-native-config';

const BASE_URL =
  Config.API_BASE_URL || 'http://10.0.2.2:5000';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default apiClient;