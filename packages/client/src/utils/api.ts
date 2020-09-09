import axios, { AxiosResponse, AxiosError } from 'axios';

const { API_URL = 'http://localhost', API_PORT = 4000 } = process.env;

export const API = axios.create({
  baseURL: `${API_URL}:${API_PORT}`,
  responseType: 'json',
});

API.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response;
  },
  (error: AxiosError<any>) => {
    const err = error.response?.data?.error || error;

    return Promise.reject(err);
  }
);
