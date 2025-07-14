import axios from "axios";
import type { User } from "@/interface/interface";

export const updateUser = (data: User) => {
  return axios.post("user/updateUserDetails", data, {
    withCredentials: true,
  });
};

export const individualUser = () => {
  return axios.get("user/getIndividualUser", {
    withCredentials: true,
  });
};

export const chattingUsers = () => {
  return axios.get("http://localhost:4000/chat/getAllChattingUser", {
    withCredentials: true,
  });
};

export const findUser = (params: string) => {
  return axios.get(`http://localhost:4000/user/findUser?${params}`, {
    withCredentials: true,
  });
};
