import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function SiteItem(props: { id: string; name: string; url: string; icon:string ; x: number; y: number; area: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: props.id });
  const [isDragging, setIsDragging] = useState(false);

  const style = {
    transform: CSS.Translate.toString(transform),
    left: `${props.x}px`,
    top: `${props.y}px`, 
  };

  const handlePointerDown = () => {
    setIsDragging(false);
     setTimeout(() => {
      setIsDragging(true);
    }, 200); 
  };

  const handlePointerMove = () => {
      setIsDragging(true); 
  };

  const handlePointerUp = () => {
    if (!isDragging) {
      window.open(props.url, "_blank");
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseMove={handlePointerMove}
      onMouseDown={handlePointerDown}
      onMouseUp={handlePointerUp}
      {...attributes}
      {...listeners}
      className="absolute pt-1 w-18 flex flex-col justify-center items-center border-amber-50 cursor-grab active:cursor-pointer hover:cursor-auto"
      
    >
      <div
        className="w-12 h-12 p-2 bg-no-repeat bg-cover rounded-full"
        style={{ backgroundImage: `url(${props.icon})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >  </div>
     { props.area==='main'&& <p className="w-18 text-center overflow-hidden overflow-ellipsis hover:cursor-default">{props.name}</p> }
    </div>
  );
}

export default SiteItem;
