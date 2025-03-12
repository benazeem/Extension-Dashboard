import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBounds } from "../features/boundsSlice";
import Droppable from "../components/Droppable";
import SiteItem from "../components/SiteItem";
import AddSiteButton from "../components/bottomMenu/AddSiteButton";
import { SiteItem as SiteItemtype } from "../features/siteSlice";


export default function SecondaryDropArea({ items }:{items: SiteItemtype[]}) {
  const dispatch = useDispatch();
  const dropAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (dropAreaRef.current) {
      dispatch(
        updateBounds({
          area: "secondary",
          size: { width: dropAreaRef.current.clientWidth, height: dropAreaRef.current.clientHeight },
        })
      );
    }
  }, [dispatch]);

  return (
    <div className="flex items-center justify-evenly rounded-lg h-[12vh] w-[80vw] bg-amber-200 p-2">
      <Droppable id="secondary" setDropRef={(el:HTMLDivElement) => (dropAreaRef.current = el)}>
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
