import { useGameStore, useKeyBindsStore, useKeys } from "store";
import { navigate } from "utils";

import styles from "./styles.module.scss";
import { SettingsControls } from "./components/settingsControls/settingsControls";

export const SettingsMenu = () => {
  const keyBinds = useKeyBindsStore();
  const { showSettingsMenu } = useGameStore();

  const keys = useKeys();

  if (!showSettingsMenu) return null;

  const handleClose = () => {
    navigate("mainMenu");
  };

  return (
    <div className={styles.container}>
      <div onClick={handleClose} className={styles.backButton}>
        <div className={styles.backButtonLabel}>X</div>
      </div>
      <div className={styles.title}>Settings</div>

      {/* {Object.keys(keys).map((key) => {
        return (
          <div key={key}>
            {key} {keys[key] ? "pressed" : "not pressed"}
          </div>
        );
      })}

{Object.keys(keys).map((key) => {
        return (
          <div key={key}>
            {key} {keys[key] ? "pressed" : "not pressed"}
          </div>
        );
      })} */}

      {/* <SettingsController /> */}

      <SettingsControls />
    </div>
  );
};
