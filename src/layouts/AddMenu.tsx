import { useRef, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { LuShoppingBasket } from "react-icons/lu";
import { LuMessageCircle } from "react-icons/lu";
import { PiMonitorThin } from "react-icons/pi";
import { IoHeartCircleOutline } from "react-icons/io5";
import { CiLink } from "react-icons/ci";
import { MdOutlineWidgets } from "react-icons/md";
import AddManually from "../components/addMenu/AddManually";
import { useShowMenu } from "../hooks/useShowMenu";








function AddMenu() {

  const listyles = 'text-gray-900 p-1 rounded-lg flex items-center gap-2 hover:bg-gray-200 cursor-pointer w-full';
  const addMenuRef = useRef<HTMLDivElement>(null);
  const { toggleMenu } = useShowMenu();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
     if(event.button===0){
      if (
        addMenuRef.current &&
        !addMenuRef.current.contains(event.target as Node)
      ) {
        toggleMenu(); // Close menu if clicked outside
      }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleMenu]);


  return (
    <div className='absolute left-[25%] top-1/8 bg-white w-1/2 h-2/3 flex' ref={addMenuRef} >
      <div className='h-full py-4 px-1 '>
        <h3 className='text-lg pb-2  text-gray-900 '>Add Shortcut</h3>
        <ul className='flex flex-col items-start gap-3 overflow-scroll h-[90%] no-scrollbar'>
          <li className={listyles}><CiLink/>Add manually</li>
          <li className={listyles}><MdOutlineWidgets />Widgets</li>
          <li className={listyles}>< IoHeartCircleOutline/>Popular</li>
          <li className={listyles}><LuShoppingBasket />Shopping</li>
          <li className={listyles}><LuMessageCircle />Social</li>
          <li className={listyles}><PiMonitorThin />Entertainment</li>
          <li className={listyles}>Lifestyle</li>
          <li className={listyles}>Travel</li>
          <li className={listyles}>News & Blogs</li>
          <li className={listyles}>Finance</li>
          <li className={listyles}>Productivity</li>
          <li className={listyles}>Graphic</li>
          <li className={listyles}>Technology</li>
        </ul>
      </div>
      <div className='bg-gray-300 ml-1  w-full h-full'>
        <div className='w-full h-16 bg-gray-200 flex items-center justify-center'>
          <div className='w-[90%] p-2 rounded-lg  bg-white flex items-center'>
          <IoSearch className='w-6 h-6 mr-1 text-gray-800' />
          <input type="text" placeholder='Search' className='w-full outline-none text-gray-900' />
        </div></div>
        <div>
         <AddManually />
        </div>
      </div>
    </div>
  )
}

export default AddMenu
