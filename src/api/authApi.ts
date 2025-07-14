import type { User } from "@/interface/interface";
import axios from "axios";


export const logInUser = (data: User) => {
  return axios.post("user/loginUser", data, {
    withCredentials: true,
  });
};

export const logOutUser = () => {
  return axios.get("user/user/logOutUser", {
    withCredentials: true,
  });
};

export const signUpUser = (data: User) => {
  return axios.post("user/loginUser", data, {
    withCredentials: true,
  });
};
