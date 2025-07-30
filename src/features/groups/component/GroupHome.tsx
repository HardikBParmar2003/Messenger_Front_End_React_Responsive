import { getAllGroups, getGroupData } from "@/api/group.api";
import { NavBar } from "@/features/home/component";
import type { Group } from "@/interface/interface";
import { useEffect, useState } from "react";
import { AllGroups } from "./AllGroups";
import { SelectedGroupContextProvider } from "../hook";
import { GroupChat } from "./GroupChat";
import CreateGroupModal from "./CreateGroupModal";
import { useSocketContext } from "@/features/auth/hooks/SocketContext";
import { useNotifictionContext } from "@/features/auth/hooks/NotificationFunction";
import { useLoggedInUserContext } from "@/features/user/hooks";
export function GroupHome() {
  const [allGroups, setAllGroups] = useState<Group[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const { socket } = useSocketContext();
  const { loggedInUser } = useLoggedInUserContext();
  const { sendNotification } = useNotifictionContext();

  async function fetchOneGroupData(
    group_id: number,
    admin_name: string,
    user_id: number
  ) {
    const response = await getGroupData(group_id);
    const groupData: Group = response.data.data;
    if (!groupData.latestMessageTime) {
      groupData.latestMessageTime = String(Date.now());
    }
    addNewGroup(groupData);
    // if (loggedInUser?.user_id == user_id) {
    
      sendNotification(
        `${loggedInUser?.first_name + " "+loggedInUser?.last_name} added into ${groupData.group_name} group, by ${admin_name}`
      );
    // }
  }

  useEffect(() => {
    async function fetchAllGroups() {
      try {
        const response = await getAllGroups();
        setAllGroups(response.data.data);
      } catch (error) {
        throw error;
      }
    }
    fetchAllGroups();
  }, []);

  useEffect(() => {
    if (!socket) return;
    if (allGroups.length > 0) {
      const groupIds = allGroups.map((g) => g.group_id);
      socket.emit("joinGroups", groupIds);
    }
  }, [allGroups, socket]);

  const closeModal = () => {
    setIsModal(false);
  };

  const addNewGroup = (newGroup: Group) => {
    setAllGroups((prev) => {
      const exists = prev.some((g) => g.group_id === newGroup.group_id);
      if (exists) return prev;
      return [...prev, newGroup];
    });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("add member to group back", (group_id, admin_name, user_id) => {
      fetchOneGroupData(group_id, admin_name, user_id);
    });
    return () => {
      socket.off("add member to group back");
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on(
      "remove member back",
      (group_id: number, user_id: number, group_name: string) => {
          sendNotification("Remove From Group", {
            body: `${loggedInUser?.first_name + " "+ loggedInUser?.last_name} removed from ${group_name}`,
          });
        onDeleteGroup(group_id);
      }
    );
    return () => {
      socket.off("remove member back");
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("update group back", (group) => {
      sendNotification(`Update group name: ${group.group_name}`);
      updatedGroups(group);
    });
    return () => {
      socket.off("update group back");
    };
  }, [socket]);

  const updatedGroups = (newGroup: Group) => {
    setAllGroups((prev) =>
      prev.map((group) =>
        group.group_id === newGroup.group_id ? newGroup : group
      )
    );
  };

  const onDeleteGroup = (group_id: number) => {
    setAllGroups((prevGroups) => {
      const update = prevGroups.filter((group) => group.group_id != group_id);
      return update;
    });
  };

  return (
    <div className="bg-gray-200 h-full">
      <NavBar />
      <SelectedGroupContextProvider>
        <div
          className={`flex h-full m-5 transition duration-300 ${
            isModal ? "blur-xs pointer-events-none" : ""
          }`}
        >
          <div className="w-[25%]  h-[80%] border- border-gray-400 bg-anmber-400">
            <AllGroups groups={allGroups} />
          </div>
          <div className="w-[53%] h-[80%] border border-gray-400 bg-gray-300">
            <GroupChat
              onUpdateGroup={updatedGroups}
              onDeleteGroup={onDeleteGroup}
              setAllGroups={setAllGroups}
              allGroups={allGroups}
            />
          </div>
          <div className="w-[25%]  h-[80%] border- border-gray-400 bg-anmber-400">
            <button
              className="bg-gray-700 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded w-[70%] cursor-pointer"
              onClick={() => setIsModal(true)}
            >
              Create Group
            </button>
          </div>
        </div>
        {isModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative z-1">
              <CreateGroupModal
                closeModal={closeModal}
                addNewGroup={addNewGroup}
              />
            </div>
          </div>
        )}
      </SelectedGroupContextProvider>
    </div>
  );
}
