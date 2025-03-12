import { useState } from "react";
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
  const [isLeftSidebarShow, setIsLeftSidebarShow] = useState(false);
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
                <Button onClick={() => setIsLeftSidebarShow(!isLeftSidebarShow)}>
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
          <HeaderMenu show={isHeaderShow} setShow={setIsHeaderShow} />
        </div>
   <LeftSidebar show={isLeftSidebarShow} setShow={setIsLeftSidebarShow} />
    <Profile show={isProfileShow} setShow={setIsProfileShow}/>
        <DragContext />
        {showMenu && <AddMenu />}
      </div>
    </>
  );
}

export default Home;
