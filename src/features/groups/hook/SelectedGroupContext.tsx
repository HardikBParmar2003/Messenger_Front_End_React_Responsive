import type { Group } from "@/interface/interface";
import { createContext, useContext, useState } from "react";

interface SelectedGroupContextType {
  selectedGroup: Group | null;
  setSelectedGroup: (group: Group | null) => void;
}
const SelectedGroupContext = createContext<
  SelectedGroupContextType | undefined
>(undefined);

export function SelectedGroupContextProvider({ children }: any) {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  return (
    <SelectedGroupContext.Provider value={{ selectedGroup, setSelectedGroup }}>
      {children}
    </SelectedGroupContext.Provider>
  );
}

export function useSelectedGroupContext() {
  const context = useContext(SelectedGroupContext);
  if (!context) {
    throw new Error("Error while using  selectd group context");
  }
  return context;
}
