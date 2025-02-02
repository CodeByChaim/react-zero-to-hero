import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api',
  withCredentials: true, // Ensures cookies are sent with every request
});

export default axiosClient;
