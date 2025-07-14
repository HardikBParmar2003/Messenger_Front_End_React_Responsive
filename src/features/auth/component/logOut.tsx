import { logOutUser } from "@/api/handler";
import { useNavigate } from "react-router-dom";

export function LogOut() {
  const navigate = useNavigate();
  async function logout() {
    const response = await logOutUser();
    navigate("/login");
  }
  logout();
  return <h1></h1>;
}
