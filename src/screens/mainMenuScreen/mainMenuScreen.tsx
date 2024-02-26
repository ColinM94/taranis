import * as React from "react";

import { useGameStore, useInput } from "store";
import { classes, navigate } from "utils";
import { gameName } from "config";
// import themeSong from "assets/music/themeSong.m4a";
import themeSong2 from "assets/music/themeSong2.mp3";
import backgroundImage from "assets/images/background.jpg";
import { Button } from "components";

import styles from "./styles.module.scss";

export const MainMenuScreen = () => {
  const { game } = useGameStore();
  const input = useInput();

  const audio = React.useRef<HTMLAudioElement>(null);

  const [selectedButton, setSelectedButton] = React.useState(0);

  const [showStart, setShowStart] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = input.createCallback("uiUp", () => {
      setSelectedButton((prev) => Math.max(0, prev - 1));
    });

    const unsubscribe2 = input.createCallback("uiDown", () => {
      setSelectedButton((prev) => Math.min(2, prev + 1));
    });

    const unsubscribe3 = input.createCallback("uiSelect", () => {
      if (selectedButton === 0) startGame();
      if (selectedButton === 1) showSettings();
      if (selectedButton === 2) quitGame();
    });

    return () => {
      unsubscribe();
      unsubscribe2();
      unsubscribe3();
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

  React.useEffect(() => {
    if (!showStart) {
      audio.current?.play();
    }
  }, [showStart]);

  return (
    <div className={styles.container}>
      <div
        onClick={() => setShowStart(false)}
        className={classes(styles.start, !showStart && styles.fadeOut)}
      >
        Click to Start
      </div>
      <img src={backgroundImage} className={styles.backgroundImage} />
      <audio ref={audio} id="audioPlayer" src={themeSong2} loop />

      <div className={classes(styles.gameName, !showStart && styles.fadeIn)}>
        {gameName}
      </div>

      <div className={classes(styles.buttons, !showStart && styles.fadeIn)}>
        <Button
          label="Start Game"
          type="text"
          onClick={startGame}
          onMouseOver={() => setSelectedButton(0)}
          className={classes(
            styles.button,
            selectedButton === 0 && styles.buttonSelected
          )}
        />

        <Button
          label="Settings"
          type="text"
          onClick={showSettings}
          onMouseOver={() => setSelectedButton(1)}
          className={classes(
            styles.button,
            selectedButton === 1 && styles.buttonSelected
          )}
        />

        <Button
          label="Quit"
          type="text"
          onClick={quitGame}
          onMouseOver={() => setSelectedButton(2)}
          className={classes(
            styles.button,
            selectedButton === 2 && styles.buttonSelected
          )}
        />
      </div>

      <div className={styles.copyright}>
        &copy;{new Date().getFullYear()} Colin Maher
      </div>
    </div>
  );
};
