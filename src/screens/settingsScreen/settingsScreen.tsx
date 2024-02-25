import { navigate } from "utils";
import { useInput } from "store";

import { SettingsKeybinds } from "./components/settingsKeybinds/settingsKeybinds";
import { SettingsControllers } from "./components/settingsControllers/settingsControllers";

import styles from "./styles.module.scss";

export const SettingsScreen = () => {
  const input = useInput();

  console.log(useInput);

  const handleClose = () => {
    navigate("mainMenu");
  };

  return (
    <>
      <div onClick={handleClose} className={styles.backButton}>
        X
      </div>

      <div className={styles.title}>Settings</div>

      <SettingsKeybinds className={styles.section} />
      <SettingsControllers className={styles.section} />
    </>
  );
};
