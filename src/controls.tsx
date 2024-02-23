import * as React from "react";
import { KeyBinds, useKeyBindsStore, useKeys } from "store";

export const Controls = () => {
  console.log("Controls");
  const keyBinds = useKeyBindsStore();
  const keys = useKeys();

  const [keyboardBindsMap, controllerBindsMap] = React.useMemo(() => {
    console.log("Key Binds");
    const keyboardMap = new Map<string, keyof KeyBinds>();
    const controllerMap = new Map<number, keyof KeyBinds>();

    const keys = Object.keys(keyBinds) as (keyof KeyBinds)[];

    for (const key of keys) {
      if (key === "updateKeyBind") continue;

      const keyBind = keyBinds[key];
      keyboardMap.set(keyBind.keyboardKey, key);
      controllerMap.set(keyBind.controllerButton, key);
    }

    return [keyboardMap, controllerMap];
  }, [keyBinds]);

  const handleKeyDown = (e: KeyboardEvent) => handleKeyPress(e, "down");
  const handleKeyUp = (e: KeyboardEvent) => handleKeyPress(e, "up");

  const handleKeyPress = (event: KeyboardEvent, type: "up" | "down") => {
    const key = event.key;

    if (keyboardBindsMap.has(key)) {
      const action = keyboardBindsMap.get(key);

      if (!action) return;

      keys.setIsPressed(action, type === "down");
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      const controller = navigator.getGamepads()[0];

      if (!controller) return;

      for (const button of controller.buttons) {
        const key = button.value;

        if (controllerBindsMap.has(key)) {
          const action = controllerBindsMap.get(key);

          if (action && button.pressed !== keys[action]) {
            keys.setIsPressed(action, button.pressed);
          }
        }
      }
    }, 25);

    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    console.log("hello");
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return <></>;
};
