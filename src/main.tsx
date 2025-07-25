import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { LoggedInUserContextProvider } from "./features/user/hooks";
import { SocketContextProvider } from "./features/auth/hooks/SocketContext";
import { NotificationContextProvider } from "./features/auth/hooks/NotificationFunction";
createRoot(document.getElementById("root")!).render(
  <LoggedInUserContextProvider>
    <NotificationContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </NotificationContextProvider>
  </LoggedInUserContextProvider>
);
