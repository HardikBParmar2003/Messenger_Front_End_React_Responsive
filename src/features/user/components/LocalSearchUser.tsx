import { useSelectedUserContext } from "@/features/chat/hooks";
import {  useMemo, useState } from "react";
interface User {
  user_id?: number;
  first_name?: string;
  last_name?: string;
  profile_photo?: string;
}

interface LocalSearchUserProps {
  users: User[];
}
export function LocalSearchUser({ users }: LocalSearchUserProps) {
  const [searchValue, setSearchValue] = useState("");
  const {setSelectedUser,selectedUser} = useSelectedUserContext();
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      (user.first_name + " " + user.last_name)
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
  }, [searchValue, users]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search local chat users"
        className="input"
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
      />
      <ul className="w-[300px] mr-10 ml-10 h-[550px] overflow-y-auto">
        {filteredUsers.map((user: User) => (
          <li
            key={user.user_id}
            className={`user-list flex items-center space-x-2 p-[5%] ml-5 mt-2 ${user.user_id === selectedUser?.user_id ? 'bg-gray-400 text-black rounded-xl' : 'hover:bg-gray-100'}` }
            onClick={()=>setSelectedUser(user)}
          >
            <img
              src={user.profile_photo}
              className="user-profile-image w-8 h-8 rounded-full cursor-pointer"
            />
            <span className="user-name">
              {user.first_name + " " + user.last_name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
