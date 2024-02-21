import { useGameStore } from "store";

import styles from "./styles.module.scss";
import { navigate } from "utils";
import { SettingsController } from "./components/settingsController/settingsController";

export const SettingsMenu = () => {
  const { showSettingsMenu } = useGameStore();

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
      <SettingsController />
    </div>
  );
};
