import { api } from "./axios";

export const updateUser = (data: FormData) => {
  return api.put("user/updateUserDetails", data);
};

export const individualUser = () => {
  return api.get("user/getIndividualUser");
};

export const findUser = (params: string) => {
  return api.post(`user/findUser?${params}`);
};

export const getGroupChat = (group_id:number) =>{
  return api.get(`/user/getGroupChatWithUser/${group_id}`)
}