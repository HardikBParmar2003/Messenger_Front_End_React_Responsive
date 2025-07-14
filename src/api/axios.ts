import axios from "axios";

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
    if (error.response?.status == 401) {
      alert("Unauthorized User");
    } else if (error.response?.status == 404) {
      alert("Not Found");
    } else if (error.response?.status == 500) {
      alert("Internal Server Error");
    }
    return Promise.reject(error);
  }
);
