import { createContext, useContext, useState } from "react";
interface User {
  user_id?: number;
  first_name?: string;
  last_name?: string;
  profile_photo?: string;
}

interface SelectedUserContextType {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
}
const SelectedUserContext = createContext<SelectedUserContextType | undefined>(
  undefined
);

export function SelectedUserContextProvider({ children }: any) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelectedUserContext.Provider>
  );
}

export function useSelectedUserContext() {
  const context = useContext(SelectedUserContext);
  if (!context) {
    throw new Error("Error while using selectd user context");
  }
  return context;
}
