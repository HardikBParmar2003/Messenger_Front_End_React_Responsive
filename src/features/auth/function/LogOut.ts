import { logOutUser } from "@/api/handler";
import { toast } from "react-toastify";

export const LogOut = async () => {
  let final: boolean = confirm("You want to log out ?");
  if (final) {
    await logOutUser();
    toast.success("Log out successfully");
    window.location.href = "/auth/login";
  } else {
    return;
  }
};
