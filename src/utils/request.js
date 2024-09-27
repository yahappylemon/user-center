import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "../router/index.jsx";

const request = axios.create({
  baseURL: "http://13.208.164.129/",
  timeout: 5000,
});

// 請求攔截器 request interceptor
request.interceptors.request.use(
  (config) => {
    // add token before request is sent
    const token = getToken();
    if (token) {
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (config) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 響應攔截器 response interceptor
request.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx
    // redirect if response error is 401
    if (error.response && error.response.status === 401) {
      removeToken();
      router.navigate("/auth?mode=login");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { request };
