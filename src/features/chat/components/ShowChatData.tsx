import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { useLoggedInUserContext } from "@/features/user/hooks/index";
import { useSelectedUserContext } from "../hooks/index";
import { useNotifictionContext } from "@/features/auth/hooks/NotificationFunction";
import type { Chat, ChatDataTypeProps } from "@/interface/interface";
import { useSocketContext } from "@/features/auth/hooks/SocketContext";

export function ShowChatData({ ChatData, setUsers }: ChatDataTypeProps) {
  const { loggedInUser } = useLoggedInUserContext();
  const { selectedUser } = useSelectedUserContext();
  const { sendNotification } = useNotifictionContext();
  const inputMessageRef = useRef<HTMLInputElement>(null);
  const [allMessages, setAllMessages] = useState<Chat[]>(ChatData || []);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { socket } = useSocketContext();

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
    if (!inputMessageRef.current?.value.trim() || !socket) {
      return;
    } else {
      const message: string = inputMessageRef.current.value.trim();
      const sender_id: number = Number(loggedInUser?.user_id);
      const receiver_id: number = Number(selectedUser?.user_id);
      const sender_name = ((loggedInUser?.first_name as string) +
        " " +
        loggedInUser?.last_name) as string;
        console.log("sending");
      socket.emit("send message", sender_id, receiver_id, message, sender_name);
      inputMessageRef.current.value = "";
    }
  }

  useEffect(() => {
    if (!socket) return;
    socket.on("send message back", async (data: Chat, sender: string) => {
      if (loggedInUser?.user_id == data.receiver_id) {
        sendNotification(`New message from ${sender}!!!`, {
          body: `Message : ${data.message}`,
          icon: "/images.jpeg",
        });
      }
      if (
        (data.sender_id === selectedUser?.user_id &&
          data.receiver_id === loggedInUser?.user_id) ||
        (data.receiver_id === selectedUser?.user_id &&
          data.sender_id === loggedInUser?.user_id)
      ) {
        setAllMessages((prev) => [...prev, data]);
      }

      setUsers((prev) => {
        let othUserId: number | null = null;
        if (data.sender_id == loggedInUser?.user_id) {
          othUserId = data.receiver_id;
        } else if (data.receiver_id == loggedInUser?.user_id) {
          othUserId = data.sender_id;
        } else {
          return prev;
        }

        const updatedUsers = prev.map((user) => {
          if (user.user_id == othUserId) {
            return {
              ...user,
              lastMessageAt: data.createdAt,
            };
          }
          return user;
        });
        updatedUsers.sort(
          (a, b) =>
            new Date(b.lastMessageAt!).getTime() -
            new Date(a.lastMessageAt!).getTime()
        );
        return updatedUsers;
      });
    });

    return () => {
      socket.off("send message back");
    };
  }, [socket, selectedUser, loggedInUser]);

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
    <div className="flex flex-col h-[91%] ">
      <div
        ref={chatContainerRef}
        className="flex-1 p-6 bg-gray-100 overflow-y-auto"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {Object.entries(groupChatByDate).map(([date, chats]) => (
          <div key={date}>
            <span className="block w-1/6 text-center mb-4 p-1 bg-gray-300 rounded-md mx-auto font-semibold">
              {date}
            </span>
            {chats.map((msg, idx) => {
              const isSender = msg.sender_id === loggedInUser?.user_id;
              const msgDate = new Date(msg.createdAt);
              const formattedTime = msgDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div key={idx}>
                  <div
                    className={`flex mb-4 m-2 p-2 break-words rounded-xl w-fit max-w-[80%] sm:max-w-[70%] md:max-w-[60%]
                              ${
                                isSender
                                  ? "bg-green-100 ml-auto text-left"
                                  : "bg-white mr-auto text-left"
                              }
                            `}
                  >
                    <div className="flex flex-col">
                      <span>{msg.message}</span>
                      <span className="text-xs text-gray-500 mt-1 self-end">
                        {formattedTime}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="bg-gray-300 p-2 mt-1 flex items-center rounded-xl">
        <input
          type="text"
          placeholder="ENTER MESSAGE"
          className="
    flex-grow  border border-gray-800 bg-white
    focus:outline-none
    focus:ring-2 focus:ring-red-400
    focus:ring-offset-0
    focus:ring-inset
    transition
  "
          ref={inputMessageRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          aria-label="Type a message"
        />
        <button
          className="bg-green-200 hover:bg-green-300 p-2 rounded-full flex items-center justify-center ml-2"
          onClick={sendMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="text-green-800 p-2" />
        </button>
      </div>
    </div>
  );
}
