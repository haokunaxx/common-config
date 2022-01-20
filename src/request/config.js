import axios from 'axios';

const service = axios.create({
  // baseURL: '/api',
  baseURL: `${process.env.NODE_ENV}/react-admin`,
  timeout: 10000,
});

service.interceptors.request.use((config) => {
  console.log(config);
  return config;
});

service.interceptors.response.use(
  (res) => {
    console.log(res);
    return res;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default service;
