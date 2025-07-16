import { useEffect, useState } from "react";
import { useLoggedInUserContext } from "../../user/hooks/index";
import { deleteGroupData, getGroupChat } from "@/api/handler";
import { useSelectedGroupContext } from "../hook";
import { ShowGroupChat } from "./ShowGroupChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faUserMinus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import EditGroupModal from "./EditGroupModal";
import type { Group } from "@/interface/interface";
import { AddMember } from "./AddMember";
type GroupUserProps = {
  onUpdateGroup: (updatedGroup: Group) => void;
  onDeleteGroup: (onDeleteGroup: number) => void;
};
export function GroupChat({ onUpdateGroup, onDeleteGroup }: GroupUserProps) {
  const { selectedGroup, setSelectedGroup } = useSelectedGroupContext();
  const { loggedInUser } = useLoggedInUserContext();
  const [chatData, setChatData] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);

  useEffect(() => {
    if (!selectedGroup) {
      return;
    }
    const group_id: number = Number(selectedGroup?.group_id);
    async function FetchChatData() {
      try {
        if (group_id) {
          const response = await getGroupChat(group_id);
          if (response.data.data.length > 0) {
            setChatData(response.data.data);
          } else {
            setChatData([]);
          }
        }
      } catch (error) {
        setChatData([]);
        throw error;
      }
    }
    FetchChatData();
  }, [selectedGroup]);

  const deleteGroup = async () => {
    const isDelete = confirm(
      `Are you sure you want to delete ${selectedGroup?.group_name} group ?`
    );
    if (isDelete) {
      const response = await deleteGroupData(Number(selectedGroup?.group_id));
      console.log("response is:", response);
      onDeleteGroup(response.data.data.group_id);
      setSelectedGroup(null);
    }
  };
  return (
    <>
      <div
        className={`flex m-1 transition duration-300 ${
          isEditOpen ? "blur-xs pointer-events-none" : ""
        }`}
      >
        {selectedGroup ? (
          <img
            src={selectedGroup?.profile_photo}
            className="user-profile-image w-[60px] h-[60px] rounded-full border border-gray-400"
            key={selectedGroup?.group_id}
          />
        ) : (
          <span className="w-[85%] mx-auto p-1.5 border rounded-4xl bg-white underline">
            Select or Create Group to start chatting
          </span>
        )}

        {loggedInUser?.user_id === selectedGroup?.user_id ? (
          <div className="flex justify-between items-center w-[80%] ">
            <div className="m-3">
              <span className="text-lg m-[15px]">
                {selectedGroup?.group_name}
              </span>
            </div>
            <div className="flex m-3 space-x-5 text-lg ">
              <button>
                <FontAwesomeIcon
                  icon={faEdit}
                  className="text-green-800 border  p-1.75 hover:cursor-pointer"
                  onClick={() => setIsEditOpen(true)}
                />
              </button>
              <button onClick={() => setIsAddMember(true)}>
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="text-green-800 border  p-1.5 hover:cursor-pointer"
                />
              </button>
              <button>
                <FontAwesomeIcon
                  icon={faUserMinus}
                  className="text-green-800 border  p-1.5 hover:cursor-pointer"
                />
              </button>
              <button onClick={deleteGroup}>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-red-800 border  p-1.5 hover:cursor-pointer"
                />
              </button>
            </div>
          </div>
        ) : (
          <span className="text-lg m-[15px]">{selectedGroup?.group_name}</span>
        )}
      </div>
      <ShowGroupChat ChatData={chatData} />

      {isEditOpen && (
        <EditGroupModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onGroupUpdated={onUpdateGroup}
        />
      )}

      {isAddMember && (
        <AddMember
          isOpen={isAddMember}
          onClose={() => setIsAddMember(false)}
        />
      )}
    </>
  );
}
