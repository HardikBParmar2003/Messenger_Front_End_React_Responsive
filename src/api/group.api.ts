import { api } from "./axios";

export const getAllGroups = () => {
  return api.get("/group/getGroups");
};

export const updateGroup = (group_id: number, formData: FormData) => {
  return api.put(`/group/updateGroupDetails/${group_id}`, formData);
};

export const createGroup = (FormData: FormData) => {
  return api.post("/group/createGroup", FormData);
};

export const deleteGroupData = (group_id: number) => {
  return api.delete(`/group/deleteGroup/${group_id}`);
};

export const getGroupUsers = (group_id: number) => {
  return api.get(`/group/getgroupUser/${group_id}`);
};

export const addMember = (formData: FormData) => {
  return api.post("/member/addToGroup", formData);
};

export const removeUser = (formData: FormData) => {
  return api.delete("/member/removeUserFromGroup", {
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const userLeftGroup = (group_id: number) => {
  return api.get(`/member/leftGroup/${group_id}`);
};

export const getGroupData = (group_id: number) => {
  return api.get(`/group/getGroupDetail/${group_id}`);
};
