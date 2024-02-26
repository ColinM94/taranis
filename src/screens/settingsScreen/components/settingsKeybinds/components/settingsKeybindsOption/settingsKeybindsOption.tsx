import * as React from "react";

import { classes } from "utils";
import { useInput } from "store";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const SettingsKeybindsOption = (props: Props) => {
  const { keybindKey, isSelected, label, onClick } = props;

  const input = useInput();

  const [selectedValue, setSelectedValue] = React.useState();

  const values = () => {
    const binds = input[keybindKey].binds;

    const tempValues = [];

    for (let i = 0; i < 5; i++) {
      const bind = binds?.[i];

      tempValues.push(
        <div key={i} className={styles.value}>
          {bind}
        </div>
      );
    }

    return tempValues;
  };

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

      {values()}
    </div>
  );
};
