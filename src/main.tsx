import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { Hud, MainMenu, PauseMenu, SettingsMenu } from "components";
import { useGameStore } from "store";
import "styles/global.scss";

import { Game } from "./game";
import { Controls } from "./controls";
import styles from "./styles/main.module.scss";

const Main = () => {
  const { showSettingsMenu, showHud, isPaused, showMainMenu } = useGameStore();

  return (
    <div className={styles.container}>
      <Controls />
      <Game className={styles.game} />

      <div className={styles.ui}>
        {(showMainMenu || isPaused || showSettingsMenu) && (
          <div className={styles.fullScreen}>
            {showMainMenu && <MainMenu />}
            {isPaused && <PauseMenu />}
            {showSettingsMenu && <SettingsMenu />}
          </div>
        )}
        {showHud && <div className={styles.overlay}>{showHud && <Hud />}</div>}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
