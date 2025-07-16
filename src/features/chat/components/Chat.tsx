import { useEffect, useState } from "react";
import { useLoggedInUserContext } from "../../user/hooks/index";
import { useSelectedUserContext } from "../hooks/index";
import { ShowChatData } from "./index";
import { fetchChatData } from "@/api/handler";

export function Chat() {
  const { selectedUser, setSelectedUser } = useSelectedUserContext();
  const { loggedInUser } = useLoggedInUserContext();

  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    if (!selectedUser) {
      setSelectedUser(loggedInUser!);
    }
    const user_id: number = Number(selectedUser?.user_id);
    async function FetchChatData() {
      try {
        if (user_id) {
          const response = await fetchChatData(user_id);
          if (response.data.data.length > 0) {
            setChatData(response.data.data);
          }else{
            setChatData([])
          }
        }
      } catch (error) {
        setChatData([]);
        throw error;
      }
    }
    FetchChatData();
  }, [selectedUser]);

  return (
    <>
      <div className="flex m-1">
        <img
          src={selectedUser?.profile_photo}
          className="user-profile-image w-[60px] h-[60px] rounded-full border border-gray-400"
          key={selectedUser?.user_id}
        />
        {loggedInUser?.user_id === selectedUser?.user_id ? (
          <span className="text-lg m-[15px]">
            {selectedUser?.first_name} {selectedUser?.last_name} (You)
          </span>
        ) : (
          <span className="text-lg m-[15px]">
            {selectedUser?.first_name} {selectedUser?.last_name}
          </span>
        )}
      </div>
      <ShowChatData ChatData={chatData} />
    </>
  );
}
