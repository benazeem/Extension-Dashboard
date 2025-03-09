"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import MainDropArea from "../layouts/MainDropArea";
import SecondaryDropArea from "../layouts/SecondaryDropArea";
import { useSelector } from "react-redux";
import { RootState } from "../store/store"
import { useDispatch } from "react-redux";
import { updateSite } from "../features/siteSlice";


const ITEM_SIZE = 60; // Width & height of items
const PADDING = 5; // Extra space for overlap prevention

// const initialSites = [
//   { id: "1", name: "Google", url: "https://google.com", x: 50, y: 50, area: "main" },
//   { id: "2", name: "Twitter", url: "https://twitter.com", x: 150, y: 150, area: "main" },
//   { id: "3", name: "Gmail", url: "https://mail.google.com", x: 250, y: 250, area: "main" },
// ];

export default function DragContext() {
  
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.sites.items);
  
  const [bounds, setBounds] = useState({
    main: { width: 0, height: 0 },
    secondary: { width: 0, height: 0 },
  });

  const updateBounds = (area: string, size: { width: number; height: number }) => {
    setBounds((prev) => ({ ...prev, [area]: size }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta, over } = event;
    if (!over) return;

    const movedItem = items.find((item) => item.id === active.id);
    if (!movedItem) return;

    let newX = movedItem.x + delta.x;
    let newY = movedItem.y + delta.y;
    const newArea = over.id as string;

    const areaBounds = bounds[newArea];

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

    dispatch(updateSite({ ...movedItem, x: newX, y: newY, area: newArea }));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="w-screen flex flex-col justify-center items-center">
        <div className="w-screen flex justify-evenly items-center">
            <div></div><MainDropArea items={items} updateBounds={updateBounds} />
            <div></div>
        </div>
        <SecondaryDropArea items={items} updateBounds={updateBounds} />
      </div>
    </DndContext>
  );
}
