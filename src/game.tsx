import * as React from "react";
import Phaser from "phaser";

import { classes } from "utils";

import styles from "./styles/game.module.scss";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: "gameContainer",
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
  render: {
    transparent: true,
  },
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      debug: true,
    },
  },

  // scene: [Preloader, MainGame],
};

interface Props {
  className?: string;
}

export const Game = ({ className }: Props) => {
  React.useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className={classes(styles.container, className)} id="gameContainer" />
  );
};
