import { useGameStore } from "store";
import { navigate } from "utils";

import { SettingsKeybinds } from "./components/settingsKeybinds/settingsKeybinds";
import { SettingsControllers } from "./components/settingsControllers/settingsControllers";

import styles from "./styles.module.scss";

export const SettingsMenu = () => {
  const { showSettingsMenu } = useGameStore();

  if (!showSettingsMenu) return null;

  const handleClose = () => {
    navigate("mainMenu");
  };

  return (
    <>
      <div onClick={handleClose} className={styles.backButton}>
        X
      </div>
      <div className={styles.title}>Settings</div>

      <div className={styles.section}>
        <SettingsKeybinds />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeading}>Controllers</div>
        <SettingsControllers />
      </div>
    </>
  );
};
