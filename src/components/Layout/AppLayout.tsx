import { type FC } from "react";
import { Outlet } from "react-router";

export const AppLayout: FC = () => {
  return (
    <div className="">
      {/* Header */}
      
      <main className="">
        <Outlet />
      </main>
      {/* Footer */}
    </div>
  );
};
