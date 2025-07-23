import { RouterProvider } from "react-router-dom";
import { router } from "./react-router"; // or whatever name you use

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
