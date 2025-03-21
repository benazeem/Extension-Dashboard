import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiCircleChevDown } from "react-icons/ci";
import { IoPersonCircleSharp } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import HeaderMenu from "../layouts/HeaderMenu";
import DragContext from "../components/DragContext";
import { useShowMenu } from "../hooks/useShowMenu";
import AddMenu from "../layouts/AddMenu";
import Button from "../components/Button";
import LeftSidebar from "../layouts/LeftSidebar";
import Profile from "../layouts/Profile";

function Home() {
  const [isHeaderShow, setIsHeaderShow] = useState(false);
  const [isSidebarShow, setIsSidebarShow] = useState(false);
  const [isProfileShow, setIsProfileShow] = useState(false);
  const context = useShowMenu();
  const showMenu =
    typeof context === "object" && "showMenu" in context
      ? context.showMenu
      : false;

  return (
    <> 
      <div className="w-screen h-screen relative box-content overflow-hidden ">
        <div className=" top-0 left-0  w-screen h-[10vh] bg-gray-700">
          <div className="flex justify-between items-center h-full px-10">
                <Button onClick={() => setIsSidebarShow(!isSidebarShow)}>
                  <CiMenuBurger />
                </Button>
                <Button
                  onClick={() => {
                    setIsHeaderShow(!isHeaderShow);
                  }}
                >
                  <CiCircleChevDown />
                </Button>
                <Button
                  onClick={() => {
                    setIsProfileShow(!isProfileShow);
                  }}
                >
                  <IoPersonCircleSharp />
                </Button>
          </div>
        </div>
        
        <DragContext />
        <AnimatePresence> {isSidebarShow && (<motion.div className="h-screen w-[20vw] bg-gray-800 absolute left-0 top-0 " 
        initial={{ x: "-100%" }} 
        animate={{ x: 0 }} 
        exit={{ x: "-100%" }} 
        transition={{ duration: 0.5 }}> <LeftSidebar  setShow={setIsSidebarShow} /> </motion.div>) }</AnimatePresence>
    <Profile show={isProfileShow} setShow={setIsProfileShow}/>
      
    <AnimatePresence> {isHeaderShow && 
        <motion.div className=" h-16 w-full bg-gray-800 absolute left-0 top-0 "
        initial={{ y: "-100%" }} 
        animate={{ y: 0 }} 
        exit={{ y: "-100%" }} 
        transition={{ duration: 0.5}} >
        <HeaderMenu  setShow={setIsHeaderShow} /> </motion.div>}</AnimatePresence>
        {showMenu && <AddMenu />}
        
      </div>
    </>
  );
}

export default Home;
