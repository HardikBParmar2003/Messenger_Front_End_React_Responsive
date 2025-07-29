import type { Dispatch, SetStateAction } from "react";

export interface User {
  user_id?: number;
  first_name?: string;
  last_name?: string;
  profile_photo?: string;
  email?: string;
  password?: string;
  lastMessageAt?:Date
}

export interface LocalSearchUserProps { 
  users: User[];
}

export interface Chat {
  sender_id: number;
  receiver_id: number;
  message: string;
  createdAt: Date;
}


export interface Group {
  group_id: number;
  group_name: string;
  profile_photo: string;
  user_id: number;
  latestMessageTime?: string;
}

export interface AllGroupsProps {
  groups: Group[];
}

export interface GroupChat {
  message: string;
  createdAt: Date;
  receiver_id:number | null;
  sender: User;
  group_id:number
}

export interface GroupChatProps {
  ChatData: GroupChat[];
  allUsers: User[];
  setAllGroups: React.Dispatch<React.SetStateAction<Group[]>>
  allGroups:Group[]

}

export interface RemoveMemberProps {
  isOpen: boolean;
  onClose: () => void;
  groupUsers: User[];
  removeMember: (user_id: number) => void;
}

export interface CloseModelProps {
  closeModal: () => void;
  addNewGroup: (group: Group) => void;
}

export interface EditGroupProps {
  isOpen: boolean;
  onClose: () => void;
  onGroupUpdated: (updatedGroup: Group) => void;
}

export interface ViewGroupMemberProps {
  isOpen: boolean;
  onClose: () => void;
  groupUsers: User[];
}

export interface chatProps {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
}

export interface loggedInUserType {
  loggedInUser: User | null;
  setLoggedInUser: (user: User) => void;
  loading: boolean;
}

export interface SelectedGroupContextType {
  selectedGroup: Group | null;
  setSelectedGroup: (group: Group | null) => void;
}

export interface ChatDataTypeProps {
  ChatData: Chat[] | null;
  setUsers: Dispatch<SetStateAction<User[]>>;
  users:User[]
}