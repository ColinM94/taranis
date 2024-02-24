import * as React from "react";

import { keybindKeys } from "consts";
import { useInput } from "store";
import { Keybinds } from "types";
import { getControllerKeyName, getKeyboardKeyName } from "utils";
import { Button } from "components";

import { SettingsKeybindsOption } from "./components/settingsKeybindsOption/settingsKeybindsOption";
import styles from "./styles.module.scss";

export const SettingsKeybinds = () => {
  const input = useInput();

  const [selectedOption, setSelectedOption] = React.useState<keyof Keybinds>();

  const handleReset = () => {
    input.reset();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedOption) return;

    input.updateKeyBind(selectedOption, { keyboardKey: e.key });
    setSelectedOption(undefined);
  };

  React.useEffect(() => {
    if (!selectedOption) return;

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedOption]);

  React.useEffect(() => {
    if (!selectedOption) return;

    const interval = setInterval(() => {
      const controller = navigator.getGamepads()[0];

      if (!controller) return;

      for (let i = 0; i < controller.buttons.length; i++) {
        const button = controller.buttons[i];

        if (button.pressed) {
          console.log("button pressed", i, selectedOption);
          input.updateKeyBind(selectedOption, { controllerButton: i });
          setSelectedOption(undefined);
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [selectedOption]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLabel}>Keybinds</div>
        <Button
          label="&#9100;"
          type="icon"
          onClick={handleReset}
          className={styles.headerButton}
        />
      </div>

      <div className={styles.options}>
        {keybindKeys.map((keybindKey) => (
          <SettingsKeybindsOption
            keybindKey={keybindKey}
            keyboardKey={getKeyboardKeyName(input[keybindKey].keyboardKey)}
            controllerKey={getControllerKeyName(
              input[keybindKey].controllerButton
            )}
            isSelected={keybindKey === selectedOption}
            label={input[keybindKey].label}
            onClick={() => setSelectedOption(keybindKey)}
            key={keybindKey}
          />
        ))}
      </div>
    </div>
  );
};
