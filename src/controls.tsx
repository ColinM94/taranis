import * as React from "react";

import { useControllerStore, useInput } from "store";
import { Keybinds } from "types";
import { KeybindKey, keybinds } from "config";

export const Controls = () => {
  const controllers = useControllerStore();

  const tempState = React.useRef<Keybinds>({
    ...keybinds,
  });

  const [keyboardMap, controllerMap] = React.useMemo(() => {
    const tempControllerMap = new Map<number, KeybindKey[]>();
    const tempKeyboardMap = new Map<string, KeybindKey[]>();

    for (const key in keybinds) {
      const keybind = keybinds[key as KeybindKey];

      for (const controllerButton of keybind.controllerButtons) {
        const array = tempControllerMap.get(controllerButton) || [];
        array.push(key as KeybindKey);
        tempControllerMap.set(controllerButton, array);
      }

      for (const keyboardKey of keybind.keyboardKeys) {
        const array = tempKeyboardMap.get(keyboardKey) || [];
        array.push(key as KeybindKey);
        tempKeyboardMap.set(keyboardKey, array);
      }
    }

    return [tempKeyboardMap, tempControllerMap];
  }, []);

  const handlePress = (keys: KeybindKey[], isPressed: boolean) => {
    for (const key of keys) {
      if (tempState.current[key].isPressed === isPressed) return;

      tempState.current[key].isPressed = isPressed;

      isPressed && useInput.getState().callbacks[key]?.(isPressed);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = keyboardMap.get(e.key);
    if (key) handlePress(key, true);
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    const key = keyboardMap.get(e.key);
    if (key) handlePress(key, false);
  };

  const handleControllerUpdate = () => {
    for (let x = 0; x < 4; x++) {
      const controller = navigator.getGamepads()[x];

      if (!controller) continue;

      for (let i = 0; i < controller.buttons.length; i++) {
        const button = controller.buttons[i];
        const key = controllerMap.get(i);

        if (key !== undefined) {
          handlePress(key, button.pressed);
        }
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
    controllers.update(e.gamepad.index, true);
  };

  const handleControllerDisconnected = (e: GamepadEvent) => {
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
