import axios from "axios";
import { toast } from "react-toastify";

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
      toast.error(error.response?.data.message);
    } else if (error.response?.status == 401) {
      toast.error(error.response?.data.message);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else if (error.response?.status == 404) {
      toast.error(error.response?.data.message);
    } else if (error.response?.status == 500) {
      toast.error(error.response?.data.message);
    }
    return Promise.reject(error);
  }
);
