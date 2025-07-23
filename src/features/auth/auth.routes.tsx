import { type RouteObject } from "react-router-dom";
import { Email, Login, Signup, VerifyEmail } from "./component";

export const AuthRoutes: RouteObject[] = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "newUser",
    element: <Email />,
  },
  {
    path: "verifyOtp",
    element: <VerifyEmail />,
  },
];
