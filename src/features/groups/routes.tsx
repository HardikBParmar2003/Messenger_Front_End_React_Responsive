import { Route } from "react-router";
import { Auth } from "@/features/home/component/Auth";
import { AllUser, UpdateUser } from "../user/components";

const ProtectedAllUser = Auth(AllUser);
const ProtectedUpdateUser = Auth(UpdateUser);

export const UserRoutes = () => (
  <>
    <Route path="users" element={<ProtectedAllUser />} />
    <Route path="updateUser" element={<ProtectedUpdateUser />} />
  </>
);
