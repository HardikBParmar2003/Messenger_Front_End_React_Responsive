import { updateGroup } from "@/api/group.api";
import React, { useState, useEffect } from "react";
import { useSelectedGroupContext } from "../hook";
import type { Group } from "@/interface/interface";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onGroupUpdated: (updatedGroup: Group) => void;
};

const EditGroupModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onGroupUpdated,
}) => {
  const { selectedGroup, setSelectedGroup } = useSelectedGroupContext();
  const [groupName, setGroupName] = useState(
    selectedGroup?.group_name as string
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(
    selectedGroup?.profile_photo
  );
  useEffect(() => {
    setGroupName(selectedGroup?.group_name as string);
    setPreview(selectedGroup?.profile_photo);
    setImageFile(null); // reset file on modal open
  }, [selectedGroup]);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("group_name", groupName);
    if (imageFile) formData.append("profile", imageFile);

    try {
      const response = await updateGroup(
        Number(selectedGroup?.group_id),
        formData
      );
      setSelectedGroup(response.data.data);
      onGroupUpdated(response.data.data);
      onClose();
    } catch (err) {
      throw err;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[350px] shadow-md relative">
       <button
        className="absolute  top-1 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 transition"
        onClick={onClose}
        aria-label="Close modal"
      >
        <span className="text-xl font-semibold leading-none">&times;</span>
      </button>
        <h2 className="text-xl font-semibold mt-4 mb-4">Edit Group</h2>

        <label className="block mb-2 text-sm font-medium">Group Name</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <label className="block mb-2 text-sm font-medium">Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="mb-4"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-full mb-4"
          />
        )}

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGroupModal;
