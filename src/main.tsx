import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { LoggedInUserContextProvider } from "./features/user/hooks";
import { SocketContextProvider } from "./features/auth/component/SocketContext";
createRoot(document.getElementById("root")!).render(
  <LoggedInUserContextProvider>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </LoggedInUserContextProvider>
);
