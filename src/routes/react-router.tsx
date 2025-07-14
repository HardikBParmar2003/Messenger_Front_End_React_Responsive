import { AppLayout } from "@/components";
import { ProductRoutes } from "@/features/user/routes";
import { createBrowserRouter, type RouteObject } from "react-router";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/product/*",
        element: <ProductRoutes />, // We can also manage all routes here rather than create specific route file
      },
    ],
  },
];

export const  router = createBrowserRouter(routes);
