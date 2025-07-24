import { useSelectedUserContext } from "@/features/chat/hooks";
import { useMemo, useState } from "react";
import type { LocalSearchUserProps, User } from "@/interface/interface";
import { useLoggedInUserContext } from "../hooks";
import { UserProfile } from "./UserProfile";

export function LocalSearchUser({ users }: LocalSearchUserProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();

  const { setSelectedUser, selectedUser } = useSelectedUserContext();
  const { loggedInUser } = useLoggedInUserContext();
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      (user.first_name + " " + user.last_name)
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
  }, [searchValue, users]);

  const onClose = () => {
    setModal(false);
  };

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
            className={`user-list w-[80%] flex items-center space-x-2 p-[5%] ml-5 mt-2 cursor-pointer ${
              user.user_id === selectedUser?.user_id
                ? "bg-gray-400 text-black rounded-xl"
                : "hover:bg-gray-300 rounded-xl"
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <img
              src={user.profile_photo}
              className="user-profile-image w-8 h-8 rounded-full cursor-pointer ring-2 ring-red-200"
              onClick={() => {
                setModal(true);
                setUserId(user.user_id);
              }}
            />
            {user.user_id == loggedInUser?.user_id ? (
              <span className="user-name">
                {user.first_name + " " + user.last_name + " (You)"}
              </span>
            ) : (
              <span className="user-name">
                {user.first_name + " " + user.last_name}
              </span>
            )}
          </li>
        ))}
      </ul>
      {modal && <UserProfile onClose={onClose} userId={Number(userId)} />}
    </div>
  );
}
