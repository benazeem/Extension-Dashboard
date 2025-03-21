import {useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateBounds } from "../features/boundsSlice";
import Droppable from "../components/Droppable";
import SiteItem from "../components/SiteItem";
import { SiteItem as SiteItemtype } from "../features/siteSlice";


export default function MainDropArea({ items}: {items: SiteItemtype[]}) {
  const dispatch = useDispatch();
  const dropAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (dropAreaRef.current) {
        dispatch(
          updateBounds({
            area: "main",
            size: {
              width: dropAreaRef.current.clientWidth,
              height: dropAreaRef.current.clientHeight,
            },
          })
        );
      }
    };

    updateSize(); // Initial update

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [dispatch]);

  return ( 
    <div className="flex h-[72vh] w-[95vw] ">
      <Droppable id="main" setDropRef={(el) => { dropAreaRef.current = el; }}>
        {items
          .filter((item) => item.area === "main")
          .map((item) => (
            <SiteItem key={item.id} {...item} />
          ))}
      </Droppable>
    </div>
  );
}
