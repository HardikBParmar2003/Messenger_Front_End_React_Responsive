import { findUser } from "@/api/handler";
import { useSelectedGroupContext } from "../hook";
import type { User } from "@/interface/interface";
import { useState } from "react";
type AddMemberProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddMember({ isOpen, onClose }: AddMemberProps) {
  const [value, setvalue] = useState("");
  const [searchUsers, setSearchUsers] = useState<User[]>([]);
  const {selectedGroup} = useSelectedGroupContext()
  const searchUser = async () => {
    const params = new URLSearchParams({
      value: value || "",
      page: "1",
      pageSize: "10",
      sortBy: "first_name",
      sortType: "desc",
    });
    const response = await findUser(params.toString());
    setSearchUsers(response.data.data);
  };

  const add = async(user_id:number)=>{
    // const formData = new FormData()
    // formData.append("member_id",user_id)
    // formData.append("group_id",selectedGroup?.group_id)
    // const response = await addMember(formData)

  }

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
        <h2 className="text-xl font-semibold mt-4 mb-4">Edit Group</h2>

        <div className="flex">
          <input
            type="text"
            value={value}
            placeholder="Search user by name or email"
            onChange={(e) => setvalue(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4"
          />
          <button
            onClick={searchUser}
            className="px-4 h-[44px] ml-2 text-xl bg-green-600 text-gray-800 rounded"
          >
            go
          </button>
        </div>

          <ul className="w-[90%]  m-2 p-5 overflow-y-auto h-[70%]">
            {searchUsers.length > 0 ? (
              searchUsers.map((user: User) => (
                <li
                  key={user.user_id}
                  className="user-list w-[100%] flex p-3"
                >
                  <img
                    src={user.profile_photo}
                    className="user-profile-image cursor-pointer w-8 h-8 rounded-full"
                  />
                  <span className="user-name w-[290px] ">
                    {user.first_name + " " + user.last_name}
                  </span>
                  <button
                    className="bg-gray-300 rounded-md p-1.5 ml-10 cursor-pointer hover:ring-2 hover:ring-blue-500"
                    onClick={() => add(Number(user.user_id))}
                  >
                    ADD
                  </button>
                </li>
              ))
            ) : (
              <li className=" mr-5 text-2xl"> Search to chat </li>
            )}
          </ul>
        </div>
      </div>
  );
}
