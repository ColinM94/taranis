import * as React from "react";
import { Stage } from "@pixi/react";

import { classes } from "utils";

import styles from "./styles/game.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Game = ({ children, className }: Props) => {
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  return (
    <Stage
      height={windowSize.height}
      width={windowSize.width}
      options={{
        backgroundColor: 0x000000,
      }}
      className={classes(styles.container, className)}
    >
      {children}
    </Stage>
  );
};
