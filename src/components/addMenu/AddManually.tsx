import  { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { RxText } from "react-icons/rx";
import { RxUpload } from "react-icons/rx";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";


import Button from "../Button";
import  downloadFavicon  from "../../utils/downloadFavicon";



function AddManually() {
 const [icon, setIcon] = useState<string>('');
 const [favicon, setFavicon] = useState<string>('');
 const [logo, setLogo] = useState(<CiStar className="w-6 h-6" />);
 const [url, setUrl] = useState<string>('');

    const handleURL = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
        const newUrl = url.split('://');
        console.log(newUrl[1]);
        if(newUrl[1]) {
            setIcon(url);
        }else{
            setIcon('');
        }
    }

    useEffect(() => {
        async function getIcon() {
            const iconUrl = await downloadFavicon(icon);
            setFavicon(iconUrl);
        }
        if (icon) {
            getIcon();
        } else {
            setFavicon('');
        }
    }, [icon]);

    useEffect(() => {
        if(favicon) {
            setLogo(<img src={favicon} alt="favicon" className="object-contain object-center h-10 w-10" />);
        } else {
            setLogo(<CiStar className="w-6 h-6" />);}

    },[favicon]);

   const handleCancel = () => {
        console.log('cancel');
   }

   const handleSave = () => {
       console.log('save');
   }

   const handleTextIcon = () => {
        const text1 = url.split('://')[1].slice(0,1).toUpperCase();
        setLogo(<p className="text-white h-10 w-10 text-3xl object-contain object-center ">{text1}</p>);
        console.log(text1);
   }


  return (
    <>
      <div className="w-full h-full p-4 flex flex-col gap-4 justify-center items-center">
        <input
          type="text"
          placeholder="Name"
          className="w-3/4 h-10 bg-white outline-none text-gray-900 px-2 rounded-lg"
        />
        <input
          type="url"
          placeholder="URL"
          className="w-3/4 h-10 bg-white outline-none text-gray-900 px-2 rounded-lg"
          onChange={handleURL}
        />

        <div className="flex flex-col gap-2 items-start w-3/4">
          <p className="text-md">icon:</p>
          <div className="flex gap-8">
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-indigo-500 flex justify-center items-center rounded ">
                {logo}
              </div>
              Logo
            </div>
            <div className="flex flex-col items-center justify-center">
              <button className="w-12 h-12 bg-violet-950 flex justify-center items-center rounded-full" onClick={()=>setLogo(<img src={favicon} alt="favicon" className="w-10 h-10" />)}>
                {favicon ? <img src={favicon} alt="favicon"   className="h-10 w-10 object-contain object-center" />  :  <CiGlobe className="border-1 border-white w-6 h-6" />}
              </button>
              Favicon
            </div>
            <div className="flex flex-col items-center justify-center">
              <button className="w-12 h-12 bg-violet-950 flex justify-center items-center rounded-full" onClick={handleTextIcon}>
                <RxText className="border-1 border-white w-6 h-6" />
              </button>
              Text
            </div>
            <div className="flex flex-col items-center justify-center">
              <button className="w-12 h-12 bg-amber-400 flex justify-center items-center rounded-full">
                <RxUpload className="w-6 h-6" />
              </button>
              Upload
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-end w-full">
          <Button onClick={handleCancel} className="bg-gray-100 text-gray-800 hover:text-white hover:bg-blue-800 border-gray-500"><IoCloseCircleOutline />Cancel</Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-800 border-blue-600 hover:border-blue-800" ><IoIosCheckmarkCircleOutline />Save</Button>
           </div>
      </div>
    </>
  );
}

export default AddManually;
