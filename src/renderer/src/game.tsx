import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import { GameScreen } from "screens/gameScreen/gameScreen";
import { useGameStore, useInput } from "store";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const Game = ({ children, className }: Props) => {
  const input = useInput();
  const { isPaused, setIsPaused } = useGameStore();

  // React.useEffect(() => {
  //   if (isPaused) return;

  //   const unsub = input.createCallback("attack", () => {
  //     setIsPaused(true);
  //   });

  //   return () => {
  //     unsub();
  //   };
  // }, [isPaused]);

  return (
    <div className={className}>
      <Canvas>{children}</Canvas>
    </div>
  );
};
