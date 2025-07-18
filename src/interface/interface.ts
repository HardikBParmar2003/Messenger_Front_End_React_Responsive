
export interface User {
    user_id?: number;
    first_name?: string;
    last_name?: string;
    profile_photo?: string;
    email?: string;
    password?: string;
  }

  export interface LocalSearchUserProps {
    users: User[];
  }

  export interface Group {
    group_id:number;
    group_name:string;
    profile_photo:string;
    user_id:number
  }

  export interface AllGroupsProps{
    groups:Group[]
  }

  export interface GroupChat{
    message:string,
    createdAt:Date,
    sender:User
  }

  export interface GroupChatProps{
    ChatData : GroupChat[]
    allUsers:User[]
  }

  export interface RemoveMemberProps  {
    isOpen: boolean;
    onClose: () => void;
    groupUsers:User[]
    removeMember : (user_id:number)=>void
  };

  export interface CloseModelProps {
    closeModal: () => void;
    addNewGroup: (group: Group) => void;
  }

  export interface EditGroupProps  {
    isOpen: boolean;
    onClose: () => void;
    onGroupUpdated: (updatedGroup: Group) => void;
  };

  export interface ViewGroupMemberProps  {
    isOpen: boolean;
    onClose: () => void;
    groupUsers:User[]
  };
 