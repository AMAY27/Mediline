import axios, { AxiosError } from "axios";

const BACKEND_URL = import.meta.env.VITE_NODE_BACKEND_URL;
let redirectCallback = null;

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (redirectCallback) redirectCallback();
      throw new Error(error.message);
    }
    return Promise.reject(error);
  }
);

export const setRedirectCallback = (callback) => {
  redirectCallback = callback;
};

export default api;
