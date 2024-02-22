import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { Hud, PauseMenu, SettingsMenu } from "components";
import { useGameStore, useKeyBindsStore } from "store";

import { Game } from "./game";

import "styles/global.scss";
import styles from "./styles/main.module.scss";

const Main = () => {
  const { showSettingsMenu, showHud, isPaused } = useGameStore();

  const keyBinds = useKeyBindsStore();

  const controllerBindsMap = React.useMemo(() => {
    const map = new Map<number, keyof KeyBinds>();
    const keys = Object.keys(keyBinds) as (keyof KeyBinds)[];

    for (const key of keys) {
      const keyBind = keyBinds[key];
      map.set(keyBind.controllerButton, key);
    }

    return map;
  }, [keyBinds]);

  const keyboardBindsMap = React.useMemo(() => {
    const map = new Map<string, keyof KeyBinds>();
    const keys = Object.keys(keyBinds) as (keyof KeyBinds)[];

    for (const key of keys) {
      const keyBind = keyBinds[key];
      map.set(keyBind.keyboardKey, key);
    }

    return map;
  }, [keyBinds]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const controller = navigator.getGamepads()[0];

      if (!controller) return;

      for (const button of controller.buttons) {
        const key = button.value;

        if (controllerBindsMap.has(key)) {
          const action = controllerBindsMap.get(key);

          if (!action) return;

          keyBinds.setIsPressed(action, button.pressed);
        }
      }
    }, 25);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;

    if (keyboardBindsMap.has(key)) {
      const action = keyboardBindsMap.get(key);

      if (!action) return;

      keyBinds.setIsPressed(action, true);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const key = event.key;

    if (keyboardBindsMap.has(key)) {
      const action = keyboardBindsMap.get(key);

      if (!action) return;

      keyBinds.setIsPressed(action, false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <div className={styles.container}>
      <Game className={styles.game} />

      <div>{JSON.stringify(keyBinds)}</div>

      <div className={styles.ui}>
        {/* {showMainMenu && <MainMenu />} */}
        {isPaused && <PauseMenu />}
        {showSettingsMenu && <SettingsMenu />}
        {showHud && <Hud />}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
