import { useGameStore } from "store";
import { MainMenuScreen, SettingsScreen } from "screens";
import { PreloaderScreen } from "screens/preloaderScreen/preloaderScreen";
import { Controls } from "./controls";
import "styles/global.scss";

import styles from "./styles/main.module.scss";
import { GameScreen } from "screens/gameScreen/gameScreen";
import { Game } from "./game";

export const Main = () => {
  const { activeScreen } = useGameStore();

  return (
    <div className={styles.container}>
      <Controls />

      {activeScreen.name === "game" && (
        <Game className={styles.game}>
          <GameScreen {...activeScreen.params} />
        </Game>
      )}

      <div className={styles.screens}>
        {activeScreen.name === "preloader" && <PreloaderScreen />}
        {activeScreen.name === "mainMenu" && (
          <MainMenuScreen {...activeScreen.params} />
        )}
        {activeScreen.name === "settings" && <SettingsScreen />}
      </div>
      {/* 
      <Game className={styles.game} />

      <div className={styles.ui}>
        {(showMainMenu || isPaused || showSettingsMenu) && (
          <div className={styles.fullScreen}>
            {showMainMenu && <MainMenuScreen />}

            {showSettingsMenu && <SettingsScreen />}
          </div>
        )}
        {(showHud || isPaused) && (
          <div className={styles.overlay}>
            {showHud && <Hud />} {isPaused && <PauseMenu />}
          </div>
        )}
      </div> */}
    </div>
  );
};
