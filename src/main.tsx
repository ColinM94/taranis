import { useGameStore } from "store";
import { MainMenuScreen } from "screens";
import "styles/global.scss";

import styles from "./styles/main.module.scss";
import { PreloaderScreen } from "screens/preloaderScreen/preloaderScreen";

export const Main = () => {
  const { activeScreen } = useGameStore();

  return (
    <div className={styles.container}>
      <div className={styles.game} id="gameContainer" />

      <div className={styles.ui}>
        {activeScreen === "preloader" && <PreloaderScreen />}
        {activeScreen === "mainMenu" && <MainMenuScreen />}
      </div>
      {/* <Controls />
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
