import { useEffect, useState } from "react";
import { useLoggedInUserContext } from "../../user/hooks/index";
import {
  deleteGroupData,
  getGroupChat,
  getGroupUsers,
  userLeftGroup,
} from "@/api/handler";
import { useSelectedGroupContext } from "../hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faEdit,
  faEye,
  faL,
  faSearch,
  faTrash,
  faUserMinus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import type { Group, User } from "@/interface/interface";
import { AddMember, EditGroupModal, RemoveMember, ShowGroupChat } from ".";
import { ViewGroupMember } from "./ViewGroupMember";
import { toast } from "react-toastify";

type GroupUserProps = {
  onUpdateGroup: (updatedGroup: Group) => void;
  onDeleteGroup: (onDeleteGroup: number) => void;
};
export function GroupChat({ onUpdateGroup, onDeleteGroup }: GroupUserProps) {
  const { selectedGroup, setSelectedGroup } = useSelectedGroupContext();
  const { loggedInUser } = useLoggedInUserContext();
  const [chatData, setChatData] = useState([]);
  const [groupUser, setGroupUsers] = useState<User[]>([]);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isAddMember, setIsAddMember] = useState<boolean>(false);
  const [isRemoveMember, setIsRemoveMember] = useState<boolean>(false);
  const [isViewMember, setIsViewMember] = useState<boolean>(false);
  const [groupUserReady, setGroupUserReady] = useState(false);

  useEffect(() => {
    if (!selectedGroup) {
      return;
    }
    const group_id: number = Number(selectedGroup?.group_id);
    async function FetchUserChatData() {
      try {
        if (group_id) {
          const groupUserData = await getGroupUsers(group_id);
          const allUsers = groupUserData.data.data.map(
            (item: { user: User }) => item.user
          );
          setGroupUsers(allUsers);
          if (allUsers.length > 0) {
            const response = await getGroupChat(group_id);
            if (response.data.data.length > 0) {
              setChatData(response.data.data);
              setGroupUserReady(true);
            } else {
              setChatData([]);
            }
          }
        }
      } catch (error) {
        setChatData([]);
        throw error;
      }
    }
    setGroupUserReady(false);
    FetchUserChatData();
  }, [selectedGroup]);

  const removeMember = (user_id: number) => {
    setGroupUsers((prevUser) =>
      prevUser.filter((user) => user.user_id != user_id)
    );
    toast.success("User removed successfully");
  };

  const addUSer = (user: User) => {
    setGroupUsers((prev) => [...prev, user]);
    toast.success("team member added");
  };

  const deleteGroup = async () => {
    const isDelete = confirm(
      `Are you sure you want to delete ${selectedGroup?.group_name} group ?`
    );
    if (isDelete) {
      const response = await deleteGroupData(Number(selectedGroup?.group_id));
      onDeleteGroup(response.data.data.group_id);
      setSelectedGroup(null);
    }
  };

  const leftGroup = async () => {
    const left: boolean = confirm(
      "Are you sure you want to left from the group"
    );
    if (left) {
      const group_id = selectedGroup?.group_id as number;
      await userLeftGroup(group_id);
      setSelectedGroup(null);
      onDeleteGroup(group_id);
    } else {
      return;
    }
  };

  return (
    <>
      <div
        className={`flex m-1 transition duration-300  ${
          isEditOpen || isAddMember || isRemoveMember
            ? "blur-xs pointer-events-none"
            : ""
        }`}
      >
        {selectedGroup ? (
          <>
            <img
              src={selectedGroup?.profile_photo}
              className="user-profile-image w-[60px] h-[60px] rounded-full border border-gray-400"
              key={selectedGroup?.group_id}
            />
            {loggedInUser?.user_id === selectedGroup.user_id ? (
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
                      className="text-green-800 border  p-1.75 hover:cursor-pointer rounded-sm"
                      onClick={() => setIsEditOpen(true)}
                    />
                  </button>
                  <button onClick={() => setIsAddMember(true)}>
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className="text-green-800 border  p-1.5 hover:cursor-pointer rounded-sm"
                    />
                  </button>
                  <button onClick={() => setIsRemoveMember(true)}>
                    <FontAwesomeIcon
                      icon={faUserMinus}
                      className="text-green-800 border  p-1.5 hover:cursor-pointer rounded-sm"
                    />
                  </button>
                  <button onClick={deleteGroup}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-800 border  p-1.5 hover:cursor-pointer rounded-sm "
                    />
                  </button>
                  <button onClick={leftGroup}>
                    <FontAwesomeIcon
                      icon={faDoorOpen}
                      className="text-red-800 border  p-1.5 hover:cursor-pointer rounded-sm"
                    />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex w-[80%] justify-between">
                <span className="text-lg m-[15px]">
                  {selectedGroup?.group_name}
                </span>
                <div className="flex w-[15%] mt-2 justify-between">
                  <button onClick={() => setIsViewMember(true)}>
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-green-800 border  p-1.5 hover:cursor-pointer rounded-sm"
                    />
                  </button>
                  <button onClick={leftGroup}>
                    <FontAwesomeIcon
                      icon={faDoorOpen}
                      className="text-red-800 border  p-1.5 hover:cursor-pointer rounded-sm"
                    />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <span className="w-[85%] mx-auto p-1.5 border rounded-4xl bg-white underline">
            Select or Create Group to start chatting
          </span>
        )}
      </div>
      {selectedGroup &&
        groupUserReady &&(
          <ShowGroupChat ChatData={chatData} allUsers={groupUser} />
        )}

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
          addUSer={addUSer}
        />
      )}

      {isRemoveMember && (
        <RemoveMember
          isOpen={isRemoveMember}
          onClose={() => setIsRemoveMember(false)}
          groupUsers={groupUser}
          removeMember={removeMember}
        />
      )}

      {isViewMember && (
        <ViewGroupMember
          isOpen={isViewMember}
          onClose={() => setIsViewMember(false)}
          groupUsers={groupUser}
        />
      )}
    </>
  );
}
