// // Name, Url, Icon
// import downloadFavicon from '../utils/downloadFavicon'

// import { useState, useEffect } from 'react';

// function SiteItem(props: {name: string, url: string}) {
//   const [icon, setIcon] = useState<string>('');

//   useEffect(() => {
//     async function getIcon() {
//       const iconUrl = await downloadFavicon(props.url);
//       setIcon(iconUrl);
//     }
//     getIcon();
//   }, [props.url]);

//   const handleClick = (url:string) => {
//     window.open(url, '_blank');
//   }

//   return (
//     <>
//       <div className="w-24 border-2 border-amber-50">
//         <div onClick={() => handleClick(props.url)} className="w-24 h-24 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${icon})` }}>
//         </div>
//         <p>{props.name}</p>
//       </div>
//     </>
//   );
// }

// export default SiteItem


import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import downloadFavicon from "../utils/fetchFavicon";

function SiteItem(props: { id: string; name: string; url: string; x: number; y: number; area: string, bgColor: string }) {
  const bgColor = props.bgColor;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: props.id });

  const [icon, setIcon] = useState<string>("");

  useEffect(() => {
    async function getIcon() {
      const iconUrl = await downloadFavicon(props.url);
      setIcon(iconUrl);
    }
    getIcon();
  }, [props.url]);

  const style = {
    transform: CSS.Translate.toString(transform),
    left: `${props.x}px`,
    top: `${props.y}px`,
    backgroundColor: `${bgColor}`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="absolute pt-1 w-12 border-amber-50 cursor-grab active:cursor-grabbing"
    >
      <div
        onClick={() => window.open(props.url, "_blank")}
        className="w-12 h-12 p-2 bg-no-repeat bg-cover rounded-full"
        style={{ backgroundImage: `url(${icon})` }}
      >  </div>
     { props.area==='main'&& <p className="text-center">{props.name}</p> }
    </div>
  );
}

export default SiteItem;
