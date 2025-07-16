import { useLoggedInUserContext } from "@/features/user/hooks";
import { Navigate } from "react-router";

export const Auth =<P extends object> (InputComponent:React.ComponentType<P>) => {
  return function OutPutComponent(props:P) {
    const { loggedInUser } = useLoggedInUserContext();
    if (!loggedInUser) {
      return <Navigate to="/login" replace />;
    } else {
      return <InputComponent {...props} />;
    }
  };
};
