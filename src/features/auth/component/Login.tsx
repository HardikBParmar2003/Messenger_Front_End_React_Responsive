import React, { useState } from "react";
import "../../../App.css";
import "../../user/style/Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoggedInUserContext } from "@/features/user/hooks";
import { logInUser } from "@/api/auth.api";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedInUser } = useLoggedInUserContext();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await logInUser(formData);
      setLoggedInUser(await response.data.data.userData);
      navigate("/users")
    } catch (error) {
      alert(error);
    }
  };


  return (
    <div className="bg--200 flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit}>
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
      <Link to="/newUser">New User ?</Link>
      </form>
    </div>
  );
}

export default Login;
