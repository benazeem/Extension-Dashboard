import { useRef, useEffect } from "react";
import CloseButton from "../components/CloseButton"
import { useState } from "react";

interface SidebarProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;

}

function Sidebar({ setShow}:SidebarProps) {
    const sidebarRef = useRef<HTMLDivElement>(null)
    const toolsByProfile = {
        developer: ["Code Editor", "Debugger", "Version Control"],
        designer: ["Canvas", "Color Picker", "Typography Tool"],
        marketer: ["Analytics Dashboard", "SEO Tool", "Campaign Manager"],
    }
    const [selectedProfile, setSelectedProfile] = useState<keyof typeof toolsByProfile>("developer");

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
         
                    <div className="p-4">
                        <label htmlFor="profile-select" className="text-gray-100">Select Profile:</label>
                        <select
                            id="profile-select"
                            className="ml-2 p-1 rounded text-gray-100 bg-gray-800 outline-none"
                            value={selectedProfile}
                            onChange={(e) => setSelectedProfile(e.target.value as keyof typeof toolsByProfile)}
                        >
                            {Object.keys(toolsByProfile).map((profile) => (
                                <option key={profile} value={profile}>
                                    {profile.charAt(0).toUpperCase() + profile.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="p-4">
                        <ul className="text-white list-none flex flex-col gap-2 justify-evenly ">
                            {toolsByProfile[selectedProfile].map((tool) => (
                                <li key={tool}>{tool}</li>
                            ))}
                        </ul>
                    </div>
               
            <div className="absolute right-0 top-0"> <CloseButton onClick={handleClose}/></div>
        </div>
    </>
  )
}

export default Sidebar