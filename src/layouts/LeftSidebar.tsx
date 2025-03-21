import { useRef, useEffect } from "react";
import CloseButton from "../components/CloseButton"

interface LeftSidebarProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;

}

function LeftSidebar({ setShow}:LeftSidebarProps) {
    const sidebarRef = useRef<HTMLDivElement>(null)

    const handleClose = () => {
        setShow(false)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setShow(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarRef, setShow]);

  return (
    <>
        <div ref={sidebarRef}  className="h-screen w-[20vw] bg-gray-800 absolute left-0 top-0 ">
            dgsuyidhaisuhgiu
            <div className="absolute right-0 top-0"> <CloseButton onClick={handleClose}/></div>
        </div>
    </>
  )
}

export default LeftSidebar