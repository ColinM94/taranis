import * as React from "react";
import { Stage } from "@pixi/react";

import { classes } from "utils";

import styles from "./styles/game.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Game = ({ children, className }: Props) => {
  return (
    <Stage
      height={window.innerHeight}
      width={window.innerWidth}
      options={{
        backgroundColor: 0x000000,
        antialias: false,
        resizeTo: window,
        resolution: window.devicePixelRatio,
      }}
      className={classes(styles.container, className)}
    >
      {children}
    </Stage>
  );
};
