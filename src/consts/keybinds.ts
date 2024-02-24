import { Keybinds } from "types";

export const keybinds: Keybinds = {
  moveLeft: {
    keyboardKey: "a",
    controllerButton: 14,
    label: "Move Left",
  },
  moveRight: {
    keyboardKey: "d",
    controllerButton: 15,
    label: "Move Right",
  },
  jump: {
    keyboardKey: " ",
    controllerButton: 0,
    label: "Jump",
  },
  attack: {
    keyboardKey: "q",
    controllerButton: 1,
    label: "Attack",
  },
  attackSecondary: {
    keyboardKey: "r",
    controllerButton: 2,
    label: "Secondary Attack",
  },
  attackTertiary: {
    keyboardKey: "e",
    controllerButton: 3,
    label: "Tertiary Attack",
  },
  pause: {
    keyboardKey: "Escape",
    controllerButton: 9,
    label: "Pause",
  },
};

export const keybindKeys = Object.keys(keybinds) as (keyof Keybinds)[];
