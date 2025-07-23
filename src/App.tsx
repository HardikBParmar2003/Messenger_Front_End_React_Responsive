import { type FC } from "react";
import { useLoggedInUserContext } from "./features/user/hooks";
import { ToastNotify } from "./features/home/component";
import { AppRoutes } from "./routes";

export const App: FC = () => {
  const { loading } = useLoggedInUserContext();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <AppRoutes />
      <ToastNotify />
    </>
  );
};
