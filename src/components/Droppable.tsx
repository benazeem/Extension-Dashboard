"use client";

import { useDroppable } from "@dnd-kit/core";

export default function Droppable({ id, children, setDropRef }) {
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
