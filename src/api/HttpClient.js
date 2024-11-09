import axios from "axios";

import config from "../config";

const HttpClient = axios.create({
  baseURL: config.baseUrl,
});

HttpClient.interceptors.response.use(
  (response) => response.data,
  (error) => error.response.data,
);

export default HttpClient;
