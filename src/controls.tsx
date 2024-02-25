import * as React from "react";

import { keybindKeys } from "consts";
import { useControllerStore, useInput, useInput2 } from "store";

type HandlePress = (
  key: string | number,
  type: "controller" | "keyboard",
  isPressed: boolean,
  inputIndex: number
) => void;

export const Controls = () => {
  const input = useInput();
  const input2 = useInput2();
  const controllers = useControllerStore();

  const handlePress: HandlePress = React.useCallback(
    (key, type, isPressed, inputIndex) => {
      if (inputIndex === 0) {
        for (let i = 0; i < keybindKeys.length; i++) {
          const keybind = input[keybindKeys[i]];

          if (type === "keyboard" && keybind?.keyboardKey === key) {
            input.updateKeyBind(keybindKeys[i], { isPressed });

            if (isPressed) {
              input.callbacks[keybindKeys[i]]?.();
            }
          }

          if (type === "controller" && keybind?.controllerButton === key) {
            input.updateKeyBind(keybindKeys[i], { isPressed });
          }
        }
      } else if (inputIndex === 1) {
        for (let i = 0; i < keybindKeys.length; i++) {
          const keybind = input2[keybindKeys[i]];

          if (type === "keyboard" && keybind?.keyboardKey === key) {
            input2.updateKeyBind(keybindKeys[i], { isPressed });
          }

          if (type === "controller" && keybind?.controllerButton === key) {
            input2.updateKeyBind(keybindKeys[i], { isPressed });
          }
        }
      }
    },
    [input.callbacks]
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    return handlePress(e.key, "keyboard", true, 0);
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    return handlePress(e.key, "keyboard", false, 0);
  };

  const handleControllerUpdate = () => {
    for (let x = 0; x < 4; x++) {
      const controller = navigator.getGamepads()[x];

      if (!controller) continue;

      for (let i = 0; i < controller.buttons.length; i++) {
        const button = controller.buttons[i];

        if (button.pressed) {
          handlePress(i, "controller", true, x);
        } else {
          handlePress(i, "controller", false, x);
        }
      }
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      handleControllerUpdate();
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleControllerConnected = (e: GamepadEvent) => {
    controllers.update(e.gamepad.index, true);
  };

  const handleControllerDisconnected = (e: GamepadEvent) => {
    controllers.update(e.gamepad.index, false);
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // window.addEventListener("gamepadconnected", handleControllerConnected);
    // window.addEventListener(
    //   "gamepaddisconnected",
    //   handleControllerDisconnected
    // );

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("gamepadconnected", handleControllerConnected);
      window.removeEventListener(
        "gamepaddisconnected",
        handleControllerDisconnected
      );
    };
  }, []);

  return <></>;
};
