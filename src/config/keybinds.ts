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
  uiUp: {
    keyboardKey: "w",
    controllerButton: 12,
    label: "UI Up",
  },
  uiDown: {
    keyboardKey: "s",
    controllerButton: 13,
    label: "UI Down",
  },
  uiLeft: {
    keyboardKey: "ArrowLeft",
    controllerButton: 14,
    label: "UI Left",
  },
  uiRight: {
    keyboardKey: "ArrowRight",
    controllerButton: 15,
    label: "UI Right",
  },
  uiSelect: {
    keyboardKey: "Enter",
    controllerButton: 0,
    label: "UI Select",
  },
  uiBack: {
    keyboardKey: "Escape",
    controllerButton: 1,
    label: "UI Back",
  },
};
