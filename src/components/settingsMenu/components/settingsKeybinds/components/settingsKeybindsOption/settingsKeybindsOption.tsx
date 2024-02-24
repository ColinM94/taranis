import { Props } from "./types";
import styles from "./styles.module.scss";
import { classes } from "utils";

export const SettingsKeybindsOption = (props: Props) => {
  const { keybindKey, isSelected, label, controllerKey, keyboardKey, onClick } =
    props;

  return (
    <div
      key={keybindKey}
      onClick={onClick}
      className={classes(
        styles.container,
        isSelected && styles.containerSelected
      )}
    >
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{keyboardKey}</div>
      <div className={styles.value}>{controllerKey}</div>
    </div>
  );
};
