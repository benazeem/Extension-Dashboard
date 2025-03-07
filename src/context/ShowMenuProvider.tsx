import { useState, ReactNode } from "react";
import { showMenuContext } from "./showMenuContext";


// Provider Component
export const ShowMenuProvider = ({ children }: { children: ReactNode }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <showMenuContext.Provider value={{ showMenu, toggleMenu }}>
      {children}
    </showMenuContext.Provider>
  );
};

