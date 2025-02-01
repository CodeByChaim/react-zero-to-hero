import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Example API
  headers: { 'Content-Type': 'application/json' },
});

export default apiClient;
