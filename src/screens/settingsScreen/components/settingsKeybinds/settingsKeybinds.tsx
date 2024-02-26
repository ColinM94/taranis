import * as React from "react";

import { useInput } from "store";
import { Keybinds } from "types";
import { classes } from "utils";
import { keybindKeys } from "consts";

import { SettingsKeybindsOption } from "./components/settingsKeybindsOption/settingsKeybindsOption";
import { SettingsSectionHeader } from "../settingsSectionHeader/settingsSectionHeader";
import styles from "./styles.module.scss";
import { Props } from "./types";

export const SettingsKeybinds = ({ className }: Props) => {
  const input = useInput();

  const [selectedOption, setSelectedOption] = React.useState<keyof Keybinds>();

  const handleReset = () => {
    input.reset();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedOption) return;

    // input.updateKeyBind(selectedOption, { keyboardKey: e.key });
    setSelectedOption(undefined);
  };

  React.useEffect(() => {
    if (!selectedOption) return;

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedOption]);

  // React.useEffect(() => {
  //   if (!selectedOption) return;

  //   const interval = setInterval(() => {
  //     const controller = navigator.getGamepads()[0];

  //     if (!controller) return;

  //     for (let i = 0; i < controller.buttons.length; i++) {
  //       const button = controller.buttons[i];

  //       if (button.pressed) {
  //         console.log("button pressed", i, selectedOption);
  //         input.updateKeyBind(selectedOption, { controllerButtons: [i] });
  //         setSelectedOption(undefined);
  //       }
  //     }
  //   }, 20);

  //   return () => clearInterval(interval);
  // }, [selectedOption]);

  return (
    <div className={classes(styles.container, className)}>
      <SettingsSectionHeader label="Keybinds" onReset={handleReset} />

      <div className={styles.options}>
        {keybindKeys.map((keybindKey) => (
          <SettingsKeybindsOption
            keybindKey={keybindKey}
            isSelected={keybindKey === selectedOption}
            label={input[keybindKey].label}
            onClick={() => setSelectedOption(keybindKey)}
            type="keyboard"
            key={keybindKey}
          />
        ))}
      </div>
    </div>
  );
};
