import axios from "axios";
import { data } from "react-router";

export const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status == 400) {
      alert(error.response?.data.message);
    } else if (error.response?.status == 401) {
      alert(error.response?.data.message);
      window.location.href = "/login"
    } else if (error.response?.status == 404) {
      alert(error.response?.data.message);
    } else if (error.response?.status == 500) {
      alert(error.response?.data.message);
    }
    return Promise.reject(error);
  }
);
