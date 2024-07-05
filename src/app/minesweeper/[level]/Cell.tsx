import { cn } from "@/lib/utils";
import { FC, useRef } from "react";

export type CellType = {
  isBomb: boolean;
  isOpen: boolean;
  isLocked: boolean;
};

export const Cell: FC<{
  cell: CellType;
  aroundBombsCount: number;
  onClick: () => void;
  onDoubleClick: () => void;
}> = ({ cell, aroundBombsCount, onClick, onDoubleClick }) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleClick = () => {
    if (!!timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
      onDoubleClick();
    } else {
      timeoutRef.current = setTimeout(() => {
        if (!cell.isLocked) onClick();
        timeoutRef.current = undefined;
      }, 300);
    }
  };

  const handleMouseDown = () => {};

  return (
    <button
      disabled={cell.isOpen}
      onClick={handleClick}
      className={cn(
        "w-8 h-8 border border-orange-500",
        cell.isOpen ? "bg-gray-200" : "bg-orange-200"
      )}
    >
      {cellText(cell, aroundBombsCount)}
    </button>
  );
};

const cellText = (cell: CellType, aroundBombsCount: number) => {
  if (cell.isOpen) {
    if (cell.isBomb) return "◉";
    else if (aroundBombsCount > 0) return aroundBombsCount;
    else return "";
  } else {
    if (cell.isLocked) return "✖️";
    else "";
  }
};
