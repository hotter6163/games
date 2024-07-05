import { Dispatch, SetStateAction, useEffect } from "react";
import { CellType } from "./Cell";
import { Status } from "./useMinesweeper";

export const useJudgeSuccess = (
  cells: CellType[],
  setStatus: Dispatch<SetStateAction<Status>>
) => {
  useEffect(() => {
    if (!cells.length) return;

    const isAllCellsOpened = cells
      .filter(({ isBomb }) => !isBomb)
      .every(({ isOpen }) => isOpen);
    const isAllBombsLocked = cells
      .filter(({ isBomb }) => isBomb)
      .every(({ isLocked }) => isLocked);
    console.log(isAllBombsLocked, isAllCellsOpened);
    if (isAllCellsOpened || isAllBombsLocked) setStatus("success");
  }, [cells, setStatus]);
};
