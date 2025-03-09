import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { CiStar } from "react-icons/ci";
import { RxText } from "react-icons/rx";
import { RxUpload } from "react-icons/rx";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";

import { addSite } from "../../features/siteSlice";
import Button from "../Button";
import fetchFavicon from "../../utils/fetchFavicon";
import { useShowMenu } from "../../hooks/useShowMenu";
import getWebsiteColor from "../../utils/getWebsiteColor";
import { convertImageToBase64 } from "../../utils/convertImagetoBase64";

function AddManually() {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [favicon, setFavicon] = useState<string>("");
  const [logo, setLogo] = useState("");
  const [url, setUrl] = useState<string>("");
  const [color, setColor] = useState<string>("rgb(79, 70, 229)");
  const [urlError, setUrlError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const { toggleMenu } = useShowMenu();

  useEffect(() => {
    const newUrl = url.split("://");
    if (newUrl[1]) {
      setIcon(url);
      async function getColor() {
        const dominantColor = await getWebsiteColor(url);
        if (dominantColor) {
          setColor(dominantColor || "rgb(79, 70, 229)");
        }
      }
      getColor();
    } else {
      setIcon("");
    }
  }, [url]);

  useEffect(() => {
    async function getIcon() {
      const iconUrl = await fetchFavicon(icon);
      setFavicon(iconUrl);
      setLogo(iconUrl)
    }
    if (icon) {
      getIcon();
    } else {
      setFavicon("");
      setLogo("");
    }
  }, [icon]);


  const handleCancel = () => {
    toggleMenu();
  };

  const handleTextIcon = () => {
    const firstAlpha = url.split("://")[1]?.charAt(0).toUpperCase() ;
    if(firstAlpha){
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const normalizedColor = color.trim().toLowerCase();
    const isWhiteBackground =
      normalizedColor === "#ffffff" ||
      normalizedColor === "rgb(255,255,255)" ||
      normalizedColor === "rgb(255, 255, 255)";
      
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // Text settings
      ctx.font = "bold 62px Arial";
      ctx.fillStyle = isWhiteBackground ? "black" : "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      // Draw the text in the center
      
      ctx.fillText(firstAlpha, canvas.width / 2, canvas.height / 2);
    }
    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL("image/png");
    setLogo(dataUrl);}
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0]; // Get the first file safely
      if (!file) return;
  
      const base64Logo = await convertImageToBase64(file);
      console.log(base64Logo);
      setLogo(base64Logo);
    } catch (error) {
      console.error("Error converting image to Base64:", error);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    const shortcutId = uuidv4();
    if(!url.trim() && !name.trim()){
      setUrlError("URL is required.");
      setNameError("Name is required.");
      urlInputRef.current?.focus();
      return;
    }
      if (!url.trim()) {
        setUrlError("URL is required.");
        urlInputRef.current?.focus();
       return;
      }
      if (!name.trim()) {
        setNameError("Name is required.");
        return;
      }
    
      setUrlError(""); 
      setNameError("");

    dispatch(
      addSite({
        name: name,
        url: url,
        icon: logo,
        area: "main",
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        bgColor: color,
        id: shortcutId,
      })
    );

    toggleMenu();
  }; 



  return (
    <>
      <div className="w-full h-full p-4 flex flex-col gap-4 justify-center items-center">
        <input
          type="text"
          placeholder={nameError ? nameError : "Name"}
          className="w-3/4 h-10 bg-white outline-none text-gray-900 px-2 rounded-lg"
          onChange={(e) => {setName(e.target.value);
            if (e.target.value.trim()) {
              setNameError(""); 
            }
          }}
        />
         <input
          type="url"
          ref={urlInputRef}
          placeholder={urlError ? urlError : "URL"}
          className="w-3/4 h-10 bg-white outline-none text-gray-900 px-2 rounded-lg"
          onChange={(e) => {
            setUrl(e.target.value);
            if (e.target.value.trim()) {
              setUrlError("");
            }
          }}
        />
       
        <div className="flex flex-col gap-2 items-start w-3/4">
          <p className="text-md">icon:</p>
          <div className="flex gap-8">
            <div className="flex flex-col items-center justify-center">
              <div
                className="w-12 h-12  flex justify-center items-center rounded "
                style={{ backgroundColor: color }} 
              >
                {logo ? <img src={logo} alt="" className="w-10 h0-10 object-center object-contain"/> : <CiStar className="text-white w-6 h-6"/>}
              </div>
              Logo
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                className="w-12 h-12 bg-violet-950 flex justify-center items-center rounded-full"
                onClick={() =>
                  setLogo(favicon)
                }
              >
                {favicon ? (
                  <img
                    src={favicon}
                    alt="favicon"
                    className="h-10 w-10 object-contain object-center"
                  />
                ) : (
                  <CiGlobe className="border-1 border-white w-6 h-6" />
                )}
              </button>
              Favicon
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                className="w-12 h-12 bg-violet-950 flex justify-center items-center rounded-full"
                onClick={handleTextIcon}
              >
                <RxText className="border-1 border-white w-6 h-6" />
              </button>
              Text
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                className="w-12 h-12 bg-amber-400 flex justify-center items-center rounded-full"
                onClick={handleUploadButtonClick}
              >
                <RxUpload className="w-6 h-6" />
                <input
                  type="file"
                  ref={fileInputRef}
                  id="file-input"
                  name="ImageStyle"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </button>
              Upload
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-end w-full">
          <Button
            onClick={handleCancel}
            className="bg-gray-100 text-gray-800 hover:text-white hover:bg-blue-800 border-gray-500"
          >
            <IoCloseCircleOutline />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-800 border-blue-600 hover:border-blue-800"
          >
            <IoIosCheckmarkCircleOutline />
            Save
          </Button>
        </div>
      </div>
    </>
  );
}

export default AddManually;
