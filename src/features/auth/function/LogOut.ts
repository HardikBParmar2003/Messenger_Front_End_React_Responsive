import { logOutUser } from "@/api/handler";
import { toast } from "react-toastify";

export const LogOut = async () => {
  let final: boolean = confirm("You want to log out ?");
  if (final) {
    await logOutUser();    
    window.location.href = "/auth/login";
    toast.success("Log out successfully");
  } else {
    return;
  }
};
