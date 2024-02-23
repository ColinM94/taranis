import * as React from "react";

import { KeyBinds, useKeyBindsStore, useKeys } from "store";
import { classes } from "utils";

import styles from "./styles.module.scss";

export const SettingsControls = () => {
  const keyBinds = useKeyBindsStore();
  const keys = useKeys();

  console.log("Setttingscontrols");

  const [selectedControl, setSelectedControl] = React.useState("");

  const options = () => {
    const keyBindKeys = Object.keys(keyBinds) as (keyof KeyBinds)[];

    const items = [];

    for (const key of keyBindKeys) {
      if (key === "updateKeyBind") continue;
      console.log(keyBinds[key]);
      items.push(
        <div key={key} className={classes(styles.controlItem)}>
          <div className={styles.controlItemLabel}>{keyBinds[key].label}</div>
          <div className={styles.controlItemValue}>
            {keys[key] ? "Pressed" : "Not Pressed"} {keyBinds[key].keyboardKey}{" "}
            {keyBinds[key].controllerButton}
          </div>
        </div>
      );
    }

    return items;
  };

  // const showPressedButtons = () => {
  //   const items = [];

  //   for (const keyBind in keyBinds) {
  //     items.push(<div>{keyBind}</div>);
  //   }
  //   return items;
  // };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>{options()}</div>
      {/* {showPressedButtons()} */}

      {JSON.stringify(keyBinds)}
      {JSON.stringify(keys)}
    </div>
  );
};
