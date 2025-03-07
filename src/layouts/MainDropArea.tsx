import {useEffect, useRef } from "react";
import Droppable from "../components/Droppable";
import SiteItem from "../components/SiteItem";


export default function MainDropArea({ items, updateBounds }) {
  const dropAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (dropAreaRef.current) {
      updateBounds("main", {
        width: dropAreaRef.current.clientWidth,
        height: dropAreaRef.current.clientHeight,
      });
    }
  }, [updateBounds]);

  return (
    <div className="flex h-[72vh] w-[95vw]">
      <Droppable id="main" setDropRef={(el) => (dropAreaRef.current = el)}>
        {items
          .filter((item) => item.area === "main")
          .map((item) => (
            <SiteItem key={item.id} {...item} />
          ))}
      </Droppable>
    </div>
  );
}
