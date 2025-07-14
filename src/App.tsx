import { type FC } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useLoggedInUserContext } from "./features/user/hooks";
import { Login, LogOut, Signup } from "./features/auth/component/index";
import { AllUser, UpdateUser } from "./features/user/components";

export const App: FC = () => {
  console.log("hello in app");
  const { loggedInUser, loading } = useLoggedInUserContext();
  console.log("loged in user is:", loggedInUser);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/users"
        element={loggedInUser ? <AllUser /> : <Navigate to="/login" />}
      />
      <Route
        path="/updateUser"
        element={loggedInUser ? <UpdateUser /> : <Navigate to="/login" />}
      />
      <Route
        path="/logout"
        element={loggedInUser ? <LogOut /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};
