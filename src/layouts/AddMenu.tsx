import { useRef, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { LuShoppingBasket, LuMessageCircle } from "react-icons/lu";
import { PiMonitorThin } from "react-icons/pi";
import { IoHeartCircleOutline } from "react-icons/io5";
import { CiLink } from "react-icons/ci";
import { MdOutlineWidgets } from "react-icons/md";
import AddManually from "../components/addMenu/AddManually";
import WidgetOptions from "../components/addMenu/WidgetOptions.tsx"; // Import WidgetOptions
import { useShowMenu } from "../hooks/useShowMenu";

function AddMenu() {
  const listyles =
    "text-gray-900 p-1 rounded-lg flex items-center gap-2 hover:bg-gray-200 cursor-pointer w-full";
  const addMenuRef = useRef<HTMLDivElement>(null);
  const { toggleMenu } = useShowMenu();

  const [selectedOption, setSelectedOption] = useState<string>("manual");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.button === 0) {
        if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
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
    <div className="absolute left-[25%] top-1/8 bg-white w-1/2 h-2/3 flex" ref={addMenuRef}>
      <div className="h-full py-4 px-1">
        <h3 className="text-lg pb-2 text-gray-900">Add Shortcut</h3>
        <ul className="flex flex-col items-start gap-3 overflow-scroll h-[90%] no-scrollbar">
          <li className={listyles} onClick={() => setSelectedOption("manual")}>
            <CiLink />
            Add manually
          </li>
          <li className={listyles} onClick={() => setSelectedOption("widgets")}>
            <MdOutlineWidgets />
            Widgets
          </li>
          <li className={listyles} onClick={() => setSelectedOption("popular")}>
            <IoHeartCircleOutline />
            Popular
          </li>
          <li className={listyles} onClick={() => setSelectedOption("shopping")}>
            <LuShoppingBasket />
            Shopping
          </li>
          <li className={listyles} onClick={() => setSelectedOption("social")}>
            <LuMessageCircle />
            Social
          </li>
          <li className={listyles} onClick={() => setSelectedOption("entertainment")}>
            <PiMonitorThin />
            Entertainment
          </li>
        </ul>
      </div>
      <div className="bg-gray-300 ml-1 w-full h-full">
        <div className="w-full h-16 bg-gray-200 flex items-center justify-center">
          <div className="w-[90%] p-2 rounded-lg bg-white flex items-center">
            <IoSearch className="w-6 h-6 mr-1 text-gray-800" />
            <input type="text" placeholder="Search" className="w-full outline-none text-gray-900" />
          </div>
        </div>
        <div>
          {selectedOption === "manual" && <AddManually />}
          {selectedOption === "widgets" && <WidgetOptions />}
        </div>
      </div>
    </div>
  );
}

export default AddMenu;
