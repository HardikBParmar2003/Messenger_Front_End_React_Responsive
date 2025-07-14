import type { User } from "@/interface/interface";
import { api } from "./axios";


export const logInUser = (data: FormData) => {
  return api.post("/user/loginUser", data); // No need to send cookie
};

export const logOutUser = () => {
  return api.delete("/user/logOutUser");
};

export const signUpUser = (data: User) => {
  return api.post("/user/loginUser", data,);
};
