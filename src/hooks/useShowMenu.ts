import { showMenuContext } from "../context/showMenuContext"
import { useContext } from "react";

export const useShowMenu = () => {
    const context = useContext(showMenuContext);
    if (!context) {
      throw new Error("useShowMenu must be used within a ShowMenuProvider");
    }
    
    return context;
  };