import * as React from "react";

import { keybindKeys } from "consts";
import { useControllerStore, useInput } from "store";

type HandlePress = (
  key: string | number,
  type: "controller" | "keyboard",
  isPressed: boolean
) => void;

export const Controls = () => {
  const input = useInput();
  const controllers = useControllerStore();

  const handlePress: HandlePress = (key, type, isPressed) => {
    for (let i = 0; i < keybindKeys.length; i++) {
      const keybind = input[keybindKeys[i]];

      if (type === "keyboard" && keybind.keyboardKey === key) {
        input.updateKeyBind(keybindKeys[i], { isPressed });
      }

      if (type === "controller" && keybind.controllerButton === key) {
        input.updateKeyBind(keybindKeys[i], { isPressed });
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) =>
    handlePress(e.key, "keyboard", true);

  const handleKeyUp = (e: KeyboardEvent) =>
    handlePress(e.key, "keyboard", false);

  const handleControllerUpdate = () => {
    const controller = navigator.getGamepads()[0];

    if (!controller) return;

    for (let i = 0; i < controller.buttons.length; i++) {
      const button = controller.buttons[i];

      if (button.pressed) {
        handlePress(i, "controller", true);
      } else {
        handlePress(i, "controller", false);
      }
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      handleControllerUpdate();
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const handleControllerConnected = (e: GamepadEvent) => {
    console.log("controller connected", e.gamepad.index);
    controllers.update(e.gamepad.index, true);
  };

  const handleControllerDisconnected = (e: GamepadEvent) => {
    console.log("controller disconnected", e.gamepad.index);
    controllers.update(e.gamepad.index, false);
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    window.addEventListener("gamepadconnected", handleControllerConnected);
    window.addEventListener(
      "gamepaddisconnected",
      handleControllerDisconnected
    );

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
