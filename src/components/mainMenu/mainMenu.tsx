import { useGameStore } from "store";

import styles from "./styles.module.scss";
import { gameName } from "consts";
import { navigate } from "utils";
import React from "react";

export const MainMenu = () => {
  const { showMainMenu, game } = useGameStore();

  if (!showMainMenu) return null;

  const startGame = () => {
    navigate("game");
    game?.scene?.start();
  };

  const showSettings = () => {
    navigate("settingsMenu");
  };

  const quitGame = () => {
    game?.scene.stop();
    window.close();
  };

  React.useEffect(() => {
    game?.scene?.start();
  }, [game?.scene]);

  return (
    <div className={styles.container}>
      <div className={styles.gameName}>{gameName}</div>

      <div className={styles.buttons}>
        <button onClick={startGame} className={styles.button}>
          Start Game
        </button>
        <button onClick={showSettings} className={styles.button}>
          Settings
        </button>
        <button onClick={quitGame} className={styles.button}>
          Quit
        </button>
      </div>

      <div className={styles.copyright}>
        &copy;{new Date().getFullYear()} Colin Maher
      </div>
    </div>
  );
};
