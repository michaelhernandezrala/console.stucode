import axios from "axios";
import config from "../config";

const HttpClient = axios.create({
  baseURL: config.baseUrl,
});

HttpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

HttpClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
    }

    return Promise.reject(error.response);
  },
);

export default HttpClient;
