import axios from "axios";

export const fetchChatData = () => {
  return axios.get(`http://localhost:4000/chat/userChat/${user_id}`, {
    withCredentials: true,
  });
};
