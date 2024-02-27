import * as React from "react";

import { gameName } from "config";
import { navigate } from "utils";
import { useGameStore } from "store";
import { createScene } from "utils/createScene";
import { PreloaderScene } from "./preloaderScene";

import styles from "./styles.module.scss";

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
};

export const PreloaderScreen = () => {
  const { game, setGame } = useGameStore();
  const [loadingMessage, setLoadingMessage] = React.useState("Loading");
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setGame(new Phaser.Game(config));

    const interval = setInterval(() => {
      setLoadingProgress((prev) => prev + 1);

      if (loadingProgress >= 100) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (!game) return;

    game?.scene.add("preloader", PreloaderScene);
    game?.scene.start("preloader");
  }, [game]);

  React.useEffect(() => {
    if (loadingProgress >= 100) {
      navigate("mainMenu");
    }
  }, [loadingProgress]);

  return (
    <div className={styles.container}>
      <div className={styles.gameName}>{gameName}</div>
      <div className={styles.loader}>
        <div className={styles.loadingText}>{loadingMessage}</div>
        <div className={styles.progressBar}>
          <div
            style={{
              width: `${loadingProgress}%`,
            }}
            className={styles.progressBarInner}
          />
        </div>
      </div>
    </div>
  );
};
