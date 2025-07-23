import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { LoggedInUserContextProvider } from "./features/user/hooks";

createRoot(document.getElementById("root")!).render(
  <LoggedInUserContextProvider>
      <App />
  </LoggedInUserContextProvider>
);
