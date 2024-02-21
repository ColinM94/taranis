import { useControlsStore, useGameStore } from "store";

import styles from "./styles.module.scss";
import React from "react";
import { classes } from "utils";

export const SettingsController = () => {
  const {
    aPressed,
    bPressed,
    dPadDown,
    dPadLeft,
    dPadRight,
    dPadUp,
    pressedButtons,
  } = useControlsStore();

  const { controllerBindings, setControllerBindings } = useGameStore();

  const [selectedControl, setSelectedControl] = React.useState("");

  const controls = [
    "moveLeft",
    "moveRight",
    "jump",
    "primaryAttack",
    "secondaryAttack",
    "tertiaryAttack",
  ];

  const controlTranslation: { [key: string]: string } = {
    moveLeft: "Move Left",
    moveRight: "Move Right",
    jump: "Jump",
    primaryAttack: "Primary Attack",
    secondaryAttack: "Secondary Attack",
    tertiaryAttack: "Tertiary Attack",
  };

  const buttonNames = [
    "A",
    "B",
    "X",
    "Y",
    "LB",
    "RB",
    "LT",
    "RT",
    "Back",
    "Start",
    "LS",
    "RS",
    "DPad Up",
    "DPad Down",
    "DPad Left",
    "DPad Right",
  ];

  const controlSettings = () => {
    return (
      <div className={styles.controls}>
        {controls.map((control, index) => (
          <div
            onClick={() => setSelectedControl(control)}
            className={classes(
              styles.controlItem,
              control === selectedControl && styles.selectedControlItem
            )}
          >
            <div className={styles.controlItemLabel}>
              {controlTranslation[control]}
            </div>
            <div className={styles.controlItemValue}>
              {buttonNames[controllerBindings[control]]}
            </div>
          </div>
        ))}
      </div>
    );
  };

  React.useEffect(() => {
    if (
      selectedControl &&
      pressedButtons.length === 1 &&
      controllerBindings[selectedControl] !== pressedButtons[0]
    ) {
      setControllerBindings({
        ...controllerBindings,
        [selectedControl]: pressedButtons[0],
      });
      setSelectedControl("");
    }
  }, [pressedButtons]);

  const showPressedButtons = () => {
    const items = [];

    for (let i = 0; i < 16; i++) {
      const isPressed = pressedButtons.includes(i);
      items.push(
        <div key={i} className={styles.buttonInfo}>
          {`[${i}]`} Button {buttonNames[i]}{" "}
          {isPressed ? " is Pressed" : "is not Pressed"}
        </div>
      );
    }
    return items;
  };

  return (
    <div className={styles.container}>
      {controlSettings()}
      {showPressedButtons()}
    </div>
  );
};
