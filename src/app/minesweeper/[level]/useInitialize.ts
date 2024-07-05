import { Dispatch, SetStateAction, useEffect } from "react";
import { useGameData } from "./useGameData";
import { CellType } from "./Cell";

export const useInitialize = (
  setCells: Dispatch<SetStateAction<CellType[]>>
) => {
  const gameData = useGameData();

  useEffect(() => {
    const bombColumns = new Set(
      Array.from({ length: gameData.size * gameData.size })
        .map((_, index) => index)
        .sort(() => Math.random() - Math.random())
        .slice(0, gameData.bombs)
    );
    setCells(
      Array.from({ length: gameData.size * gameData.size })
        .map((_, index) => index)
        .map((index) => ({
          isBomb: bombColumns.has(index),
          isOpen: false,
          isLocked: false,
        }))
    );
  }, [gameData, setCells]);
};
