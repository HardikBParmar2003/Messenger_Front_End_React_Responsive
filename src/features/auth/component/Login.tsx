import React, { useEffect, useState } from "react";
import "../../../App.css";
import "../../user/style/Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoggedInUserContext } from "@/features/user/hooks";
import { logInUser } from "@/api/auth.api";
import { getCookie } from "../function";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedInUser } = useLoggedInUserContext();
  const isToken = getCookie("jwt_token");

  useEffect(() => {
    const token = getCookie("jwt_token");
    if (token) {
      alert("You are logged in user")
      navigate("/users");
    }
  }, [navigate]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await logInUser(formData);
      setLoggedInUser(await response.data.data.userData);
      navigate("/users");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="bg--200 flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="text-left">
        <h3 className="text-4xl font-bold mb-5 text-center">Log In</h3>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
        </div>
        <button type="submit">Log In</button>
        <Link to="/newUser" className="m-5 bg-blue-100 min-w-50 p-2 rounded-md text-center">New User ?</Link>
      </form>
    </div>
  );
}

export default Login;
