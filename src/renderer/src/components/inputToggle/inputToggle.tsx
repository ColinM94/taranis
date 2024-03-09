import * as React from "react";
import { classes } from "utils";
import styles from "./styles.module.scss";
import { InputToggleProps } from "./types";

export const InputToggle = (props: InputToggleProps) => {
  const { value, setValue, className } = props;

  return (
    <div
      onClick={() => setValue(!value)}
      className={classes(styles.container, className)}
    >
      <div
        className={classes(
          styles.knob,
          value ? styles.knobActive : styles.knobInactive
        )}
      />
    </div>
  );
};
