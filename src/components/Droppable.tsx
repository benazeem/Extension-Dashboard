"use client";

import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: string;
  children: React.ReactNode;
  setDropRef?: (el: HTMLDivElement | null) => void;
}

export default function Droppable({ id, children, setDropRef }:DroppableProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={(el) => {
        setNodeRef(el); // Required for DnD Kit
        if (setDropRef) setDropRef(el); // Pass ref to parent
      }}
      className="relative w-full overflow-hidden h-full "
    >
      {children}
    </div>
  );
}
