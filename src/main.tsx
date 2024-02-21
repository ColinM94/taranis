import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { Hud, PauseMenu, SettingsMenu } from "components";
import {
  KeyBind,
  KeyBindsState,
  useControlsStore,
  useGameStore,
  useKeyBindsStore,
} from "store";

import { Game } from "./game";

import "styles/global.scss";
import styles from "./styles/main.module.scss";

const Main = () => {
  const { setIsPaused } = useGameStore();
  const { showSettingsMenu, showHud, isPaused } = useGameStore();

  const keyBinds = useKeyBindsStore();

  const {
    setDPadLeft,
    setDPadUp,
    setDPadRight,
    setDPadDown,
    setAPressed,
    setBPressed,
    setXPressed,
    setYPressed,
    setStartPressed,
    setPressedButtons,
  } = useControlsStore();

  React.useEffect(() => {
    const interval = setInterval(() => {
      const controller = navigator.getGamepads()[0];

      if (!controller) return;

      setAPressed(controller.buttons[0].pressed);
      setBPressed(controller.buttons[1].pressed);
      setXPressed(controller.buttons[2].pressed);
      setYPressed(controller.buttons[3].pressed);

      setPressedButtons(
        controller.buttons
          .map((button, index) => index)
          .filter((index) => controller.buttons[index].pressed)
      );

      setStartPressed(controller.buttons[9].pressed);

      setDPadDown(controller.buttons[13].pressed);
      setDPadUp(controller.buttons[12].pressed);
      setDPadLeft(controller.buttons[14].pressed);
      setDPadRight(controller.buttons[15].pressed);
    }, 25);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const keyboardBindsMap = React.useMemo(() => {
    const map = new Map<string, string>();
    const keys = Object.keys(keyBinds) as (keyof KeyBindsState)[];

    for (const key of keys) {
      const keyBind: KeyBind = keyBinds[key];

      if (keyBind.keyboardKey) {
        map.set(keyBind.keyboardKey, key);
      }
    }

    return map;
  }, [keyBinds]);

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;

    if (keyboardBindsMap.has(key)) {
      const action = keyboardBindsMap.get(key);
      console.log(action);

      // TODO: trigger callbacks.

      if (action === "moveLeft") {
        keyBinds.onMoveLeftCallback();
      }

      if (action === "moveRight") {
        keyBinds.onMoveRightCallback();
      }
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const key = event.key;

    if (keyboardBindsMap.has(key)) {
      const action = keyboardBindsMap.get(key);

      if (action === "moveLeft") {
      }

      if (action === "moveRight") {
        keyBinds.onMoveRightCallback();
      }
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
