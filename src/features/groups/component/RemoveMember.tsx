import type { RemoveMemberProps, User } from "@/interface/interface";
import { useMemo, useState } from "react";
import { useLoggedInUserContext } from "@/features/user/hooks";
import { useSelectedGroupContext } from "../hook";
import { removeUser } from "@/api/handler";
import { useSocketContext } from "@/features/auth/hooks/SocketContext";
export function RemoveMember({
  isOpen,
  onClose,
  groupUsers,
  removeMember,
}: RemoveMemberProps) {
  const [value, setValue] = useState("");
  const { selectedGroup } = useSelectedGroupContext();
  const { loggedInUser } = useLoggedInUserContext();
  const { socket } = useSocketContext();

  const filteredUsers = useMemo(() => {
    return groupUsers.filter((user) =>
      (user.first_name + " " + user.last_name)
        .toLowerCase()
        .includes(value.toLowerCase())
    );
  }, [value, groupUsers]);

  const remove = async (user: User) => {
    const formData = new FormData();
    const user_id = String(user.user_id);
    const group_id = String(selectedGroup?.group_id);
    const admin_name = String(
      loggedInUser?.first_name + " " + loggedInUser?.last_name
    );
    const user_name = String(user.first_name + " " + user.last_name);
    formData.append("member_id", user_id);
    formData.append("group_id", group_id);
    await removeUser(formData);
    socket!.emit("remove member", user_id, group_id, selectedGroup?.group_name);
    socket!.emit(
      "send group message",
      loggedInUser?.user_id,
      group_id,
      `${admin_name}  remove ${user_name}`,
      selectedGroup?.group_name,
      user_id
    );
    removeMember(user.user_id as number);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[30%] h-[70%] shadow-md relative">
        <button
          className="absolute  top-1 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 transition"
          aria-label="Close modal"
          onClick={onClose}
        >
          <span className="text-xl font-semibold leading-none">&times;</span>
        </button>
        <h2 className="text-xl font-semibold mt-4 mb-4">Remove Member</h2>

        <div className="flex">
          <input
            type="text"
            value={value}
            placeholder="Search user by name"
            onChange={(e) => setValue(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4"
          />
        </div>

        <ul className="w-[90%]  m-2 p-5 overflow-y-auto h-[70%]">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user: User) => (
              <div key={user.user_id}>
                {user.user_id !== loggedInUser?.user_id && (
                  <li
                    key={user.user_id}
                    className="user-list w-[100%] flex p-3"
                  >
                    <img
                      src={user.profile_photo}
                      className="user-profile-image cursor-pointer w-8 h-8 rounded-full ring-2 ring-red-200"
                    />
                    <span className="user-name w-[290px] ">
                      {user.first_name + " " + user.last_name}
                    </span>
                    <button
                      className="bg-gray-300 rounded-md p-1.5 ml-10 cursor-pointer hover:ring-2 hover:ring-blue-500"
                      onClick={() => remove(user)}
                    >
                      Remove
                    </button>
                  </li>
                )}
              </div>
            ))
          ) : (
            <li className=" mr-5 text-2xl"> Search to chat </li>
          )}
        </ul>
      </div>
    </div>
  );
}
