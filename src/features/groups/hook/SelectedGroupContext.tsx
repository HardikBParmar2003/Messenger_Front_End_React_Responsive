import type { Group, SelectedGroupContextType } from "@/interface/interface";
import React, { createContext, useContext, useState } from "react";

const SelectedGroupContext = createContext<
  SelectedGroupContextType | undefined
>(undefined);

export function SelectedGroupContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
