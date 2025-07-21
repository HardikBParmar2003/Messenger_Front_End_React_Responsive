import { useEffect, useState } from "react";
import { useLoggedInUserContext } from "../../user/hooks/index";
import {
  deleteGroupData,
  getGroupChat,
  getGroupUsers,
  groupChatDownload,
  userLeftGroup,
} from "@/api/handler";
import { useSelectedGroupContext } from "../hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faDownload,
  faEdit,
  faEye,
  faFile,
  faFilePdf,
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
  const [loading, setLoading] = useState(false);

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

  async function downloadChat(): Promise<void> {
    try {
      setLoading(true);
      const group_id = selectedGroup?.group_id as number;
      const response = await groupChatDownload(group_id);
      alert(response.data.message);
      setLoading(false);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

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
                <div className="flex m-3 space-x-4 text-lg ">
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

                  <button onClick={downloadChat}>
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      className="text-green-800 border  p-1.5 hover:cursor-pointer rounded-sm"
                    />
                  </button>

                  <button onClick={leftGroup}>
                    <FontAwesomeIcon
                      icon={faDoorOpen}
                      className="text-red-800 border  p-1.5 hover:cursor-pointer rounded-sm"
                    />
                  </button>

                  <button onClick={deleteGroup}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-800 border  p-1.5 hover:cursor-pointer rounded-sm "
                    />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex w-[80%] justify-between">
                <span className="text-lg m-[15px]">
                  {selectedGroup?.group_name}
                </span>
                <div className="flex w-[23%] mt-2 justify-between bg-amber-5000 text-lg">
                  <button onClick={() => setIsViewMember(true)}>
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-green-800 border  p-1.5 hover:cursor-pointer rounded-sm"
                    />
                  </button>

                  <button onClick={downloadChat}>
                    <FontAwesomeIcon
                      icon={faFilePdf}
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
      {selectedGroup && (
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
      {loading ? (
        <span>
          {" "}
          <svg
            aria-hidden="true"
            role="status"
            className="  text-xl m-[20px] p-0.5 inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
          Loading...
        </span>
      ) : (
        <></>
      )}
    </>
  );
}
