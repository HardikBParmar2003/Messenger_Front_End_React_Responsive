import { SelectedUserContextProvider } from "@/features/chat/hooks/index";
import { useEffect, useState, type FC } from "react";
import {GlobalSearchUser, LocalSearchUser} from "./index";
import {LoggedInUserComponent} from "../hooks";
import { Chat } from "../../chat/components/index";

export const AllUser: FC = () => {
  interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    profile_photo: string;
  }
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "http://localhost:4000/chat/getAllChattingUser",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status == 200) {
          const data = await response.json();
          console.log("fetched user chat is:",data);
          setUsers(data.data);
        } else {
          const err = await response.json();

          alert(err);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <SelectedUserContextProvider>
      <div className="flex h-screen">
        <div className="w-[25%]  h-[90%] border- border-gray-400">
          <LocalSearchUser users={users} />
        </div>
        <div className="w-[53%] h-[90%] border border-gray-400 bg-gray-300">
          <Chat />
        </div>
        <div className="w-[22%]  h-[90%]">
          <div>
          <LoggedInUserComponent />
          </div>
          <GlobalSearchUser />
        </div>
      </div>
    </SelectedUserContextProvider>
  );
};
