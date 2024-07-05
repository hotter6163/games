"use client";

import { FC } from "react";
import { useGameData } from "./useGameData";
import { Cell } from "./Cell";
import { useMinesweeper } from "./useMinesweeper";

export const Minesweeper: FC = () => {
  const gameData = useGameData();
  const { cells, status, getAroundBombCount, onClickCell, onDoubleClick } =
    useMinesweeper();

  return (
    <div>
      <p>{status}</p>
      <div className="flex flex-col">
        {Array.from({ length: gameData.size })
          .map((_, index) =>
            cells.slice(index * gameData.size, (index + 1) * gameData.size)
          )
          .map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((cell, columnIndex) => {
                const index = rowIndex * gameData.size + columnIndex;

                return (
                  <Cell
                    key={columnIndex}
                    cell={cell}
                    aroundBombsCount={getAroundBombCount(index)}
                    onClick={onClickCell(index)}
                    onDoubleClick={onDoubleClick(index)}
                  />
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};
