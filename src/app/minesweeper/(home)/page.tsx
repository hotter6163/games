import Link from "next/link";
import { FC } from "react";
import { LEVELS } from "../levels";

const TopPage: FC = () => {
  return (
    <div className="h-screen w-screen overflow-scroll flex justify-center items-center bg-orange-50">
      <div className="px-16 py-8 rounded-2xl shadow-xl bg-orange-200">
        <h1 className="text-3xl font-bold mb-8">MINES WEEPER</h1>
        <ul className=" space-y-2">
          {LEVELS.map(({ level, size, bombs }) => (
            <li key={level}>
              <Link href={`/minesweeper/${level}`}>
                レベル{level} ({size} x {size}, bombs: {bombs}個)
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopPage;
