import { api } from "./axios";

export const fetchChatData = (user_id:number) => {
  return api.get(`/chat/userChat/${user_id}`);
};


export const chattingUsers = () => {
    return api.get("chat/getAllChattingUser");
  };
