import { Route, Routes } from "react-router";
import { Email, Login, Signup, VerifyEmail } from "./component/index"

export const AuthRoutes = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<Signup />} />
    <Route path="newUser" element={<Email />} />
    <Route path="verifyOtp" element={<VerifyEmail />} />
  </Routes>
);
