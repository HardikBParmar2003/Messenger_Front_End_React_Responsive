import { api } from "./axios";

export const updateUser = (data: FormData) => {
  return api.put("user/updateUserDetails", data);
};

export const loggedInUser = () => {
  return api.get("user/getIndividualUser");
};

export const individualUser = (user_id?: number) => {
  if (user_id) return api.get(`user/getIndividualUser/${user_id}`);
  else return api.get("user/getIndividualUser");
};

export const findUser = (params: string) => {
  return api.post(`user/findUser?${params}`);
};

export const getGroupChat = (group_id: number) => {
  return api.get(`/user/getGroupChatWithUser/${group_id}`);
};

export const groupChatDownload = (group_id: number) => {
  return api.get(`/user/generatePDFGroupChat/${group_id}`);
};
