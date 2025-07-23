import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { io } from "socket.io-client";
import { useLoggedInUserContext } from "@/features/user/hooks/index";
import { useSelectedUserContext } from "../hooks/index";
import type { User } from "@/interface/interface";
import { chattingUsers } from "@/api/chat.api";

interface Chat {
  sender_id: number;
  receiver_id: number;
  message: string;
  createdAt: Date;
}

interface ChatDataTypeProps {
  ChatData: Chat[] | null;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
}

const socket = io("http://localhost:4000", {
  withCredentials: true,
});

export function ShowChatData({ ChatData, setUsers }: ChatDataTypeProps) {
  const { loggedInUser } = useLoggedInUserContext();
  const { selectedUser } = useSelectedUserContext();
  const inputMessageRef = useRef<HTMLInputElement>(null);
  const [allMessages, setAllMessages] = useState<Chat[]>(ChatData || []);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const groupChatByDate = useMemo(() => {
    const grouped: Record<string, Chat[]> = {};
    allMessages?.map((chat) => {
      const chatDate = new Date(chat.createdAt);
      const chatDateKey = `${chatDate.getDate()} - ${
        chatDate.getMonth() + 1
      } - ${chatDate.getFullYear()}`;
      if (!grouped[chatDateKey]) {
        grouped[chatDateKey] = [];
      }
      grouped[chatDateKey].push(chat);
    });

    return grouped;
  }, [allMessages]);

  function sendMessage() {
    if (!inputMessageRef.current?.value.trim()) {
    } else {
      const message: string = inputMessageRef.current.value.trim();
      const sender_id: number = Number(loggedInUser?.user_id);
      const receiver_id: number = Number(selectedUser?.user_id);

      socket.emit("send message", sender_id, receiver_id, message);

      inputMessageRef.current.value = "";
    }
  }

  useEffect(() => {
    socket.on("send message back", async (data: Chat) => {
      if (
        (data.sender_id === selectedUser?.user_id &&
          data.receiver_id === loggedInUser?.user_id) ||
        (data.receiver_id === selectedUser?.user_id &&
          data.sender_id === loggedInUser?.user_id)
      ) {
        setAllMessages((prev) => [...prev, data]);
      }
      try {
        if (
          loggedInUser?.user_id == data.sender_id ||
          loggedInUser?.user_id == data.receiver_id
        ) {
          const response = await chattingUsers();
          if (response.data.data) {
            setUsers(response.data.data);
          } else {
            setUsers([]);
          }
        }
      } catch (err: any) {
        throw err;
      }
    });

    return () => {
      socket.off("send message back");
    };
  }, [allMessages]);

  useEffect(() => {
    if (ChatData) {
      setAllMessages(ChatData);
    }
  }, [ChatData]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [allMessages]);
  return (
    <div className="flex flex-col h-[92%] ">
      <div
        ref={chatContainerRef}
        className="flex-1 p-6 bg-gray-100 overflow-y-auto h-["
      >
        {Object.entries(groupChatByDate).map(([date, chat]) => (
          <div key={date}>
            <span className="block w-[15%] text-center mb-4  p-0.5 bg-gray-300 rounded-md m-auto ">
              {date}
            </span>
            {chat.map((msg, index) => {
              const isSender = msg.sender_id === loggedInUser?.user_id;
              const newDate: Date = new Date(msg.createdAt);
              const newTime: string =
                newDate.getHours() + ":" + newDate.getMinutes();
              return isSender ? ( // I can also user conditional class name
                <div
                  key={index}
                  className="flex mb-4 w-[20%] bg-green-100 ml-auto rounded-md text-left"
                >
                  <div className="w-full m-2 text-left">
                    {msg.message}
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      {newTime}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="flex  mb-4 w-[20%] bg-white mr-auto  rounded-md"
                >
                  <div className="w-full m-2 text-left">
                    {msg.message}
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      {newTime}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="bg-gray-300 p-1 mt-1 h-auto ">
        <input
          type="text"
          placeholder="ENTER MESSAGE"
          className="w-[85%] mx-auto p-1.5 border rounded-4xl bg-white"
          ref={inputMessageRef}
        />
        <button
          className="bg-red-600-200 p-2.5 ml-4 border rounded-full min-w-[50px] cursor-pointer"
          onClick={sendMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="text-green-800 " />
        </button>
      </div>
    </div>
  );
}
