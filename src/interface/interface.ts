
export interface User {
    user_id?: number;
    first_name?: string;
    last_name?: string;
    profile_photo?: string;
    email?: string;
    password?: string;
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
  }