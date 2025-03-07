import { useRef, useEffect } from "react";
import Droppable from "../components/Droppable";
import SiteItem from "../components/SiteItem";
// import AddSite from "../components/bottomMenu/AddSiteButton";
import AddSiteButton from "../components/bottomMenu/AddSiteButton";


export default function SecondaryDropArea({ items, updateBounds }) {
  const dropAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (dropAreaRef.current) {
      updateBounds("secondary", {
        width: dropAreaRef.current.clientWidth,
        height: dropAreaRef.current.clientHeight,
      });
    }
  }, [updateBounds]);

  return (
    <div className="flex items-center justify-evenly rounded-lg h-[12vh] w-[80vw] bg-amber-200 p-2">
      <Droppable id="secondary" setDropRef={(el) => (dropAreaRef.current = el)}>
        {items
          .filter((item) => item.area === "secondary")
          .map((item) => (
            <SiteItem key={item.id} {...item} />
          ))}
      </Droppable>
      <div>
      <AddSiteButton />
      </div>
    </div>
  );
}
