// import { useState } from "react";
import { MdDownload } from "react-icons/md";
import CloseButton from "../components/CloseButton";
import Bookmarks from "../components/headerActions/Bookmarks";
import History from "../components/headerActions/History";


interface HeaderMenuProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function HeaderMenu({ setShow }: HeaderMenuProps) {

  const handleCloseHeaderMenu = () => {
    setShow(false);
  };

  return (
    <>
    
        <div className=" w-full h-full flex justify-between items-center px-10 ">
          <div className="flex gap-4 justify-evenly w-full">
            <Bookmarks />
            <History />
            <div className="text-white"><MdDownload />
            </div>
          </div>
          <div className="absolute right-1 top-1  ">
            <CloseButton onClick={handleCloseHeaderMenu} />
          </div>
        </div>
    
    </>
  );
}

export default HeaderMenu;
