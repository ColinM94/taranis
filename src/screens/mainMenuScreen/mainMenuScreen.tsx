import * as React from "react";

import { useGameStore, useInput } from "store";
import { classes, navigate } from "utils";
import { gameName } from "config";

import styles from "./styles.module.scss";

export const MainMenuScreen = () => {
  const { game } = useGameStore();
  const input = useInput();

  const [selectedButton, setSelectedButton] = React.useState(0);

  console.log(selectedButton);

  React.useEffect(() => {
    const unsubscribe = input.createCallback("uiUp", () => {
      console.log("uiUpCallback");
      setSelectedButton((prev) => prev - 1);
    });

    const unsubscribe2 = input.createCallback("uiDown", () => {
      console.log("uiDownCallback");
      setSelectedButton((prev) => prev + 1);
    });

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, []);

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
        <button
          onClick={startGame}
          className={classes(
            styles.button,
            selectedButton === 0 && styles.buttonSelected
          )}
        >
          Start Game
        </button>
        <button
          onClick={showSettings}
          className={classes(
            styles.button,
            selectedButton === 1 && styles.buttonSelected
          )}
        >
          Settings
        </button>
        <button
          onClick={quitGame}
          className={classes(
            styles.button,
            selectedButton === 2 && styles.buttonSelected
          )}
        >
          Quit
        </button>
      </div>

      <div className={styles.copyright}>
        &copy;{new Date().getFullYear()} Colin Maher
      </div>
    </div>
  );
};
