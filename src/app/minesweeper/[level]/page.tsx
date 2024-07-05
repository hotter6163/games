import { FC } from "react";
import { LEVELS } from "../levels";
import { redirect } from "next/navigation";
import { Minesweeper } from "./Minesweeper";

interface Props {
  params: { level: string };
}

const PlayPage: FC<Props> = ({ params: { level } }) => {
  const gameData = LEVELS.find((game) => game.level === Number(level));
  if (!gameData) return redirect("/minesweeper");

  return (
    <div className="h-screen w-screen overflow-scroll flex justify-start items-start bg-orange-50 p-8">
      <Minesweeper />
    </div>
  );
};

export default PlayPage;
