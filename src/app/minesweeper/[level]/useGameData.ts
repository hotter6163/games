import { useParams } from "next/navigation";
import { LEVELS } from "../levels";

type Params = {
  level: string;
};

export const useGameData = () => {
  const { level } = useParams<Params>();
  return LEVELS.find((game) => game.level === Number(level))!;
};
