import { useState } from "react";
import { useGameData } from "./useGameData";
import { CellType } from "./Cell";
import { useInitialize } from "./useInitialize";
import { useJudgeSuccess } from "./useJudgeSuccess";

export type Status = "ready" | "progress" | "success" | "failed";

export const useMinesweeper = () => {
  const gameData = useGameData();

  const [cells, setCells] = useState<CellType[]>([]);
  const [status, setStatus] = useState<Status>("ready");

  useInitialize(setCells);
  useJudgeSuccess(cells, setStatus);

  const isTopSide = (index: number) => index < gameData.size;
  const isBottomSide = (index: number) =>
    index >= gameData.size * (gameData.size - 1);
  const isLeftSide = (index: number) => index % gameData.size === 0;
  const isRightSide = (index: number) =>
    index % gameData.size === gameData.size - 1;

  const getAroundCellIndexes = (index: number) => {
    const indexes = [];
    if (!isTopSide(index) && !isLeftSide(index))
      indexes.push(index - gameData.size - 1);
    if (!isTopSide(index)) indexes.push(index - gameData.size);
    if (!isTopSide(index) && !isRightSide(index))
      indexes.push(index - gameData.size + 1);
    if (!isLeftSide(index)) indexes.push(index - 1);
    if (!isRightSide(index)) indexes.push(index + 1);
    if (!isBottomSide(index) && !isLeftSide(index))
      indexes.push(index + gameData.size - 1);
    if (!isBottomSide(index)) indexes.push(index + gameData.size);
    if (!isBottomSide(index) && !isRightSide(index))
      indexes.push(index + gameData.size + 1);
    return indexes;
  };

  const openCells = (indexes: number[]) => {
    setCells((pre) =>
      pre.map((cell, index) => ({
        isBomb: cell.isBomb,
        isOpen: cell.isOpen || indexes.includes(index),
        isLocked: cell.isLocked,
      }))
    );
  };

  const getAroundBombCount = (index: number) =>
    getAroundCellIndexes(index).filter((index) => cells[index].isBomb).length;

  const onClickCell = (index: number) => () => {
    if (index < 0 || index >= gameData.size * gameData.size)
      throw new Error("Index is out of range");
    const cell = cells[index];
    if (cell.isBomb) {
      openCells([index]);
      setStatus("failed");
      return;
    } else {
      let queue = [index];
      let openedIndexes: number[] = [];
      while (queue.length > 0) {
        const target = queue.shift()!;
        openedIndexes = [...openedIndexes, target];
        const aroundBombCount = getAroundBombCount(target);
        if (aroundBombCount === 0) {
          queue = [
            ...queue,
            ...getAroundCellIndexes(target).filter(
              (index) =>
                !cells[index].isOpen &&
                !queue.includes(index) &&
                !openedIndexes.includes(index)
            ),
          ];
        }
      }
      openCells(openedIndexes);
    }
  };

  const onDoubleClick = (index: number) => () => {
    if (index < 0 || index >= gameData.size * gameData.size)
      throw new Error("Index is out of range");

    setCells((pre) =>
      pre.map((cell, i) => ({
        ...cell,
        isLocked: i === index ? !cell.isLocked : cell.isLocked,
      }))
    );
  };

  return {
    cells,
    status,
    getAroundBombCount,
    onClickCell,
    onDoubleClick,
  };
};
