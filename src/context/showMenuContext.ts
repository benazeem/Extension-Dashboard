import { createContext } from "react"

export interface MenuContextType {
    showMenu: boolean;
    toggleMenu: () => void;
  }
export const showMenuContext = createContext<MenuContextType|boolean>(false)