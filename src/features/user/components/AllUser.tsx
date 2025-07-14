import { SelectedUserContextProvider } from "@/features/chat/hooks/index";
import { useEffect, useState, type FC } from "react";
import {GlobalSearchUser, LocalSearchUser} from "./index";
import {LoggedInUserComponent} from "../hooks";
import { Chat } from "../../chat/components/index";
import { chattingUsers } from "@/api/handler";

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
        const response = await chattingUsers()
        if(response.data.data){
          setUsers(response.data.data);
        }else{
          setUsers([])
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
