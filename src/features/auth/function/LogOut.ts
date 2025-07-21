import { logOutUser } from "@/api/handler";

export const LogOut = async () => {
  let final:boolean = confirm("You want to log out ?")
  if(final){
    await logOutUser();
    window.location.href = "/login";
  }else{
    return
  }
};
