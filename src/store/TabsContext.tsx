import { createContext, useState } from "react";

export const TabsContext = createContext({
  isTabsOpen: true,
  onTabsVisibilityChange: (newVisibilityState: boolean) => {},
});

export function TabsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTabsOpen, setIsTabsOpen] = useState(true);

  function handleTabsChange(newVisibilityState: boolean) {
    setIsTabsOpen(newVisibilityState);
  }

  const value = {
    isTabsOpen: isTabsOpen,
    onTabsVisibilityChange: handleTabsChange,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}
