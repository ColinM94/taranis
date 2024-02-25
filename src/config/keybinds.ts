import { Keybind } from "types";

export type KeybindKey =
  | "moveLeft"
  | "moveRight"
  | "jump"
  | "attack"
  | "attackSecondary"
  | "attackTertiary"
  | "pause"
  | "uiDown"
  | "uiUp"
  | "uiLeft"
  | "uiRight"
  | "uiSelect"
  | "uiBack";

export const controllerButtonNames = {
  0: "A",
  1: "B",
  2: "X",
  3: "Y",
  4: "LB",
  5: "RB",
  6: "LT",
  7: "RT",
  8: "Back",
  9: "Start",
  10: "LS",
  11: "RS",
  12: "DPad Up",
  13: "DPad Down",
  14: "DPad Left",
  15: "DPad Right",
};

export const keybinds: Record<KeybindKey, Keybind> = {
  moveLeft: {
    keyboardKeys: ["a"],
    controllerButtons: [14],
    label: "Move Left",
  },
  moveRight: {
    keyboardKeys: ["d"],
    controllerButtons: [15],
    label: "Move Right",
  },
  jump: {
    keyboardKeys: [" "],
    controllerButtons: [0],
    label: "Jump",
  },
  attack: {
    keyboardKeys: ["q"],
    controllerButtons: [1],
    label: "Attack",
  },
  attackSecondary: {
    keyboardKeys: ["r"],
    controllerButtons: [2],
    label: "Secondary Attack",
  },
  attackTertiary: {
    keyboardKeys: ["e"],
    controllerButtons: [3],
    label: "Tertiary Attack",
  },
  pause: {
    keyboardKeys: ["Escape"],
    controllerButtons: [9],
    label: "Pause",
  },
  uiUp: {
    keyboardKeys: ["ArrowUp"],
    controllerButtons: [12],
    label: "UI Up",
  },
  uiDown: {
    keyboardKeys: ["ArrowDown"],
    controllerButtons: [13],
    label: "UI Down",
  },
  uiLeft: {
    keyboardKeys: ["ArrowLeft"],
    controllerButtons: [14],
    label: "UI Left",
  },
  uiRight: {
    keyboardKeys: ["ArrowRight"],
    controllerButtons: [15],
    label: "UI Right",
  },
  uiSelect: {
    keyboardKeys: ["Enter"],
    controllerButtons: [0],
    label: "UI Select",
  },
  uiBack: {
    keyboardKeys: ["Escape"],
    controllerButtons: [9],
    label: "UI Back",
  },
};
