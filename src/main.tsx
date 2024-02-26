import { Hud, PauseMenu } from "components";
import { useGameStore } from "store";
import { MainMenuScreen, SettingsScreen } from "screens";
import "styles/global.scss";

import styles from "./styles/main.module.scss";
import { Controls } from "./controls";

export const Main = () => {
  const { showSettingsMenu, showHud, isPaused, showMainMenu } = useGameStore();

  return (
    <div className={styles.container}>
      <Controls />
      {/* <Game className={styles.game} /> */}

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
      </div>
    </div>
  );
};
