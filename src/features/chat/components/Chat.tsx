import { chatDownload, fetchChatData } from "@/api/handler";
import type { Chat, chatProps } from "@/interface/interface";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLoggedInUserContext } from "../../user/hooks/index";
import { useSelectedUserContext } from "../hooks/index";
import { ShowChatData } from "./index";
import { UserProfile } from "@/features/user/components/UserProfile";
import { LoaderComponent } from "@/components/Loader/Loader";

export function Chat({ setUsers }: chatProps) {
  const { selectedUser, setSelectedUser } = useSelectedUserContext();
  const { loggedInUser } = useLoggedInUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [chatData, setChatData] = useState<Chat[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  useEffect(() => {
    if (!selectedUser) {
      setSelectedUser(loggedInUser!);
    }
    const user_id: number = Number(selectedUser?.user_id);
    async function FetchChatData(): Promise<void> {
      try {
        if (user_id) {
          const response = await fetchChatData(user_id);
          if (response.data.data.length > 0) {
            setChatData(response.data.data);
          } else {
            setChatData([]);
          }
        }
      } catch (error) {
        setChatData([]);
        throw error;
      }
    }
    FetchChatData();
  }, [selectedUser]);

  async function downloadChat(): Promise<void> {
    try {
      setLoading(true);
      const data = {
        user_id: selectedUser?.user_id as number,
        user_name: (selectedUser?.first_name +
          " " +
          selectedUser?.last_name) as string,
      };
      const response = await chatDownload(data);
      toast.success(response.data.message);
      setLoading(false);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const onClose = () => {
    setModal(false);
  };

  return (
    <>
      <div className="flex justify-between items-center m-1">
        <div className="flex items-center space-x-3">
          <img
            src={selectedUser?.profile_photo}
            alt={`${selectedUser?.first_name} ${selectedUser?.last_name} profile`}
            className="w-14 h-14 rounded-full ring-2 ring-red-200 cursor-pointer object-cover"
            onClick={() => {
              setModal(true);
              setUserId(selectedUser?.user_id);
            }}
          />
          <span className="text-lg font-medium">
            {selectedUser?.first_name} {selectedUser?.last_name}
            {loggedInUser?.user_id === selectedUser?.user_id ? " (You)" : ""}
          </span>
        </div>
  
        <div>
          {loading ? (
            <span>
              <LoaderComponent />
            </span>
          ) : (
            <button onClick={downloadChat} aria-label="Download chat as PDF">
              <FontAwesomeIcon
                icon={faFilePdf}
                className="text-green-800 border p-2 rounded-sm hover:bg-green-100 transition cursor-pointer text-2xl"
              />
            </button>
          )}
        </div>
      </div>
  
      <ShowChatData ChatData={chatData} setUsers={setUsers} />
  
      {modal && <UserProfile onClose={onClose} userId={Number(userId)} />}
  
    </>
  );
}



