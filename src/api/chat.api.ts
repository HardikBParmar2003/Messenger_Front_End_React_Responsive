import { api } from "./axios";

export const fetchChatData = (user_id: number) => {
  return api.get(`/chat/userChat/${user_id}`);
};

export const chattingUsers = () => {
  return api.get("/chat/getAllChattingUser");
};

export const chatDownload = (data: { user_id: number; user_name: string }) => {
  return api.post("/user/generatePDFPersonalChat", data);
};
