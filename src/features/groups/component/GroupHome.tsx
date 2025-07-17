import { getAllGroups } from "@/api/group.api";
import { NavBar } from "@/features/home/component";
import type { Group } from "@/interface/interface";
import { useEffect, useState } from "react";
import { AllGroups } from "./AllGroups";
import { SelectedGroupContextProvider } from "../hook";
import { GroupChat } from "./GroupChat";
import CreateGroupModal from "./CreateGroupModal";

export function GroupHome() {
  const [allGroups, setAllGroups] = useState<Group[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
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
  const closeModal = () => {
    setIsModal(false);
  };

  const addNewGroup = (newGroup: Group) => {
    setAllGroups((prev) => [...prev, newGroup]);
  };

  const updatedGroups = (newGroup: Group) => {
    setAllGroups((prev) =>
      prev.map((group) =>
        group.group_id === newGroup.group_id ? newGroup : group
      )
    );
  };

  const onDeleteGroup = (group_id: number) => {
    setAllGroups((prevGroups) =>
      prevGroups.filter((group) => group.group_id !== group_id)
    );
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
          {" "}
          <div className="w-[25%]  h-[80%] border- border-gray-400 bg-anmber-400">
            <AllGroups groups={allGroups} />
          </div>
          <div className="w-[53%] h-[80%] border border-gray-400 bg-gray-300">
            <GroupChat
              onUpdateGroup={updatedGroups}
              onDeleteGroup={onDeleteGroup}

            />
          </div>
          <div className="w-[25%]  h-[80%] border- border-gray-400 bg-anmber-400">
            <button
              className="bg-gray-400 p-2 m-1 border rounded-xl text-2xl hover:bg-white border-gray-800"
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
