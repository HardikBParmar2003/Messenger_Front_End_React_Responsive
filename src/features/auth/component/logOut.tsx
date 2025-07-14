import { useNavigate } from "react-router-dom";


export function LogOut() {
    const navigate = useNavigate()
  async function logout() {
    const response = await fetch("http://localhost:4000/user/logOutUser", {
      method: "DELETE",
      credentials: "include",
    });
    if (response.status == 200) {
        navigate("/login");
    } else {
      alert("Something went wrong");
    }
  }
  logout()
  return <h1>Helo</h1>;
}

