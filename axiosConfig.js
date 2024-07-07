// axiosConfig.js
import axios from 'axios';
import config from './config';

const environment = process.env.NODE_ENV || 'development';
const apiConfig = config[environment];

const axiosInstance = axios.create({
  baseURL: apiConfig.apiUrl,
});

export default axiosInstance;
