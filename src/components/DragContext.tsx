import { DndContext, DragEndEvent } from "@dnd-kit/core";
import MainDropArea from "../layouts/MainDropArea";
import SecondaryDropArea from "../layouts/SecondaryDropArea";
import { useSelector } from "react-redux";
import { RootState } from "../store/store"
import { useDispatch } from "react-redux";
import { updateSite } from "../features/siteSlice";
import { BoundState } from "../features/boundsSlice";


const ITEM_SIZE = 72; // Width & height of items
const PADDING = 5; 

export default function DragContext() {
  
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.sites.items);
  const bounds = useSelector((state: RootState) => state.bounds );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta, over } = event;
    if (!over) return;

    const movedItem = items.find((item) => item.id === active.id);
    if (!movedItem) return;

    const newArea = over.id as keyof BoundState;
    const areaBounds = bounds[newArea];

  
    if (!areaBounds || areaBounds.height === 0) {
      console.warn(`Bounds not found or height is 0 for area: ${newArea}`);
      return;
    }

    let newX = movedItem.x + delta.x;
    let newY = movedItem.y + delta.y;

    newX = Math.max(0, Math.min(newX, areaBounds.width - ITEM_SIZE));
    newY = Math.max(0, Math.min(newY, areaBounds.height - ITEM_SIZE));


    let isOverlapping;
    do {
      isOverlapping = false;
      for (const other of items) {
        if (other.id !== movedItem.id && other.area === newArea) {
          const distanceX = Math.abs(newX - other.x);
          const distanceY = Math.abs(newY - other.y);
          if (distanceX < ITEM_SIZE + PADDING && distanceY < ITEM_SIZE + PADDING) {
            newX += ITEM_SIZE + PADDING;
            isOverlapping = true;
            break;
          }
        }
      }
    } while (isOverlapping);
    if (movedItem.x !== newX || movedItem.y !== newY || movedItem.area !== newArea) {
      dispatch(updateSite({ ...movedItem, x: newX, y: newY, area: newArea }));
    }
    
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="w-screen flex flex-col justify-center items-center">
        <div className="w-screen flex justify-evenly items-center">
            <div></div><MainDropArea items={items} />
            <div></div>
        </div>
        <SecondaryDropArea items={items}  />
      </div>
    </DndContext>
  );
}
