import { useSelectedUserContext } from "@/features/chat/hooks";
import { useEffect, useState, type FC } from "react";

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  profile_photo: string;
}
export const GlobalSearchUser: FC = () => {
  const [userName, setUserName] = useState("");
  const [serachUsers, setSearchUsers] = useState<User[]>([]);
  const {setSelectedUser} = useSelectedUserContext();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const params = new URLSearchParams({
          value: userName || "",
          page: "1",
          pageSize: "10",
          sortBy: "first_name",
          sortType: "desc",
        });

        const response = await fetch(
          `http://localhost:4000/user/findUser?${params.toString()}`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        if (response.status == 200) {
          const data = await response.json();
          setSearchUsers(data.data);
        }
      } catch (error) {
        alert(error);
        throw error;
      }
    }
    if (userName.trim() != "") {
      fetchUsers();
    } else {
      setSearchUsers([]);
    }
  }, [userName]);
  return (
    <div>
      <input
        type="text"
        placeholder="Search users to start chat"
        className="input"

        value={userName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserName(e.target.value)
        }
      />

      <ul className="w-[300px] h-[600px] m-5 overflow-y-auto">
        {serachUsers.length > 0 ? (
          serachUsers.map((user: User) => (
            <li key={user.user_id} className="user-list w-[280px] flex p-1.5">
              <img src={user.profile_photo} className="user-profile-image cursor-pointer w-8 h-8 rounded-full" />
              <span className="user-name w-[290px] ">
                {user.first_name + " " + user.last_name}
              </span>
              <button className="bg-gray-300 rounded-md p-1.5 ml-10 cursor-pointer hover:ring-2 hover:ring-blue-500" onClick={()=>setSelectedUser(user)}>Chat</button>
            </li>
          ))
        ) : (
          <li className=" mr-5 text-2xl"> Search to chat </li>
        )}
      </ul>
    </div>
  );
}

