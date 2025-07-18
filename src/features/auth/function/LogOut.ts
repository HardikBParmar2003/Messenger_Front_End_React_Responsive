import { logOutUser } from "@/api/handler";

export const LogOut = async () => {
  await logOutUser();
  window.location.href = "/login";
};
