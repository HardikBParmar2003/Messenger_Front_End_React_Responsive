import type { GroupChat, GroupChatProps } from "@/interface/interface";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLoggedInUserContext } from "@/features/user/hooks";
import { useSelectedGroupContext } from "../hook";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  withCredentials: true,
});

export function ShowGroupChat({ ChatData }: GroupChatProps) {
  const [allMessages, setAllMessages] = useState<GroupChat[]>(ChatData || []);
  const { selectedGroup } = useSelectedGroupContext();
  const { loggedInUser } = useLoggedInUserContext();
  const inputMessageRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const groupChatByDate = useMemo(() => {
    const grouped: Record<string, GroupChat[]> = {};
    const sortedMessages = [...allMessages].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    sortedMessages.forEach((chat) => {
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
      const group_id: number = Number(selectedGroup?.group_id);
      socket.emit("send group message", sender_id, group_id, message);
      inputMessageRef.current.value = "";
    }
  }

  useEffect(() => {
    if (!selectedGroup) return;
    socket.on("send group message back", (data) => {
      if (selectedGroup?.group_id == data.group_id) {
        setAllMessages((prev) => [...prev, data]);
      }
    });
    return () => {
      socket.off("send group message back");
    };
  }, [selectedGroup]);

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
    <div className="flex flex-col h-[96.5%]  ">
      <div
        ref={chatContainerRef}
        className="flex-1 p-6 bg-gray-100 overflow-y-auto min-h-0"
      >
        {Object.entries(groupChatByDate)
          .sort(([a], [b]) => {
            const [aDay, aMonth, aYear] = a.split(" - ").map(Number);
            const [bDay, bMonth, bYear] = b.split(" - ").map(Number);
            const dateA = new Date(aYear, aMonth, aDay);
            const dateB = new Date(bYear, bMonth, bDay);
            return dateA.getTime() - dateB.getTime();
          })
          .map(([date, chat]) => (
            <div key={date}>
              <span className="block w-[15%] text-center mb-4  p-0.5 bg-gray-300 rounded-md m-auto ">
                {date}
              </span>
              {chat.map((msg, index) => {
                const isSender = msg.sender.user_id === loggedInUser?.user_id;
                const newDate: Date = new Date(msg.createdAt);
                const newTime: string =
                  newDate.getHours() + ":" + newDate.getMinutes();
                return isSender ? (
                  <div
                    key={index}
                    className="flex mb-4 w-[40%] bg-green-100 ml-auto rounded-md"
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
                    className="flex  mb-4 w-[40%] bg-white mr-auto  rounded-md"
                  >
                    <div className="w-full m-2 text-left">
                      <div className="flex mb-2">
                        <img
                          src={msg.sender.profile_photo}
                          className="w-5 h-5 rounded-full hover:cursor-pointer"
                        />
                        <span className="text-sm ml-1">
                          {msg.sender.first_name} {msg.sender.last_name}
                        </span>
                      </div>
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
        {selectedGroup ? (
          <>
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
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-green-800 "
              />
            </button>
          </>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}
