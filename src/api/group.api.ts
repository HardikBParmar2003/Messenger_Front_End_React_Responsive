import { api } from "./axios";

export const getAllGroups = () => {
  return api.get("/group/getGroups");
};

export const updateGroup = (group_id: number,formData:FormData) =>{
    return api.put(`/group/updateGroupDetails/${group_id}`,formData)
}

export const createGroup = (FormData:FormData)=>{
  return api.post('/group/createGroup',FormData)
}

export const deleteGroupData = (group_id:number)=>{
  return api.delete(`group/deleteGroup/${group_id}`)
}
