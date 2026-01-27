import { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => setIsMinimized((prev) => !prev);

  return (
    <LayoutContext.Provider value={{ isMinimized, toggleSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);