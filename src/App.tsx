import { type FC } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useLoggedInUserContext } from "./features/user/hooks";
import { Login, Signup } from "./features/auth/component/index";
import { AllUser, UpdateUser } from "./features/user/components";
import { Auth } from "./features/home/component/Auth";
import { GroupHome } from "./features/groups/component/GroupHome";
import { Email } from "./features/auth/component/Email";
import { VerifyEmail } from "./features/auth/component/VerifyEmail";
import { ToastNotify } from "./features/home/component";

export const App: FC = () => {
  const { loggedInUser, loading } = useLoggedInUserContext();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const ProtectedAllUser = Auth(AllUser);
  const ProtextdUpdateUser = Auth(UpdateUser);
  const ProtectedGroupHome = Auth(GroupHome);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/newUser" element={<Email />} />
        <Route path="/verifyOtp" element={<VerifyEmail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<ProtectedAllUser />} />
        <Route path="/updateUser" element={<ProtextdUpdateUser />} />
        <Route path="/group/home" element={<ProtectedGroupHome />} />
      </Routes>
      <ToastNotify />
    </>
  );
};
