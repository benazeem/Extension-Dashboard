import { createContext } from "react"

interface MenuContextType {
    showMenu: boolean;
    toggleMenu: () => void;
  }
export const showMenuContext = createContext<MenuContextType|boolean>(false)