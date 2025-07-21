import { findUser } from "@/api/handler";
import { useSelectedUserContext } from "@/features/chat/hooks";
import { errorMonitor } from "events";
import { useEffect, useState, type FC } from "react";

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  profile_photo: string;
}
export const GlobalSearchUser: FC = () => {
  const [value, seSearchValue] = useState("");
  const [serachUsers, setSearchUsers] = useState<User[]>([]);
  const { setSelectedUser } = useSelectedUserContext();
  // const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      async function fetchUsers() {
        try {
          const params = new URLSearchParams({
            value: value || "",
            page: "1",
            pageSize: "10",
            sortBy: "first_name",
            sortType: "desc",
          });
          const response = await findUser(params.toString());
          if (response.data.data) {
            setSearchUsers(response.data.data);
          } else {
            setSearchUsers([]);
          }
        } catch (error) {
          alert(error);
          throw error;
        }
      }

      if (value.trim() != "") {
        fetchUsers();
      } else {
        setSearchUsers([]);
      }
    }, 300);
    return () => clearTimeout(debounceFunction);
  }, [value]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search users to start chat"
        className="input"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          seSearchValue(e.target.value)
        }
      />

      <ul className="w-[300px] h-[600px] m-5 overflow-y-auto">
        {serachUsers.length > 0 ? (
          serachUsers.map((user: User) => (
            <li key={user.user_id} className="user-list w-[280px] flex p-1.5">
              <img
                src={user.profile_photo}
                className="user-profile-image cursor-pointer w-8 h-8 rounded-full"
              />
              <span className="user-name w-[290px] ">
                {user.first_name + " " + user.last_name}
              </span>
              <button
                className="bg-gray-300 rounded-md p-1.5 ml-10 cursor-pointer hover:ring-2 hover:ring-blue-500"
                onClick={() => setSelectedUser(user)}
              >
                Chat
              </button>
            </li>
          ))
        ) : (
          <li className=" mr-5 text-2xl"> Search to chat </li>
        )}
      </ul>
    </div>
  );
};
