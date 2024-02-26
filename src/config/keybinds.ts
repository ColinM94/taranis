import { Bind, Keybind } from "types";

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

export const controllerButtonNames = {};

export const keyNames: Record<Bind, string> = {
  "keyboard:ArrowLeft": "←",
  "keyboard:ArrowRight": "→",
  "keyboard:ArrowUp": "↑",
  "keyboard:ArrowDown": "↓",
  "keyboard:KeyA": "A",
  "keyboard:KeyB": "B",
  "keyboard:KeyC": "C",
  "keyboard:KeyD": "D",
  "keyboard:KeyE": "E",
  "keyboard:KeyF": "F",
  "keyboard:KeyG": "G",
  "keyboard:KeyH": "H",
  "keyboard:KeyI": "I",
  "keyboard:KeyJ": "J",
  "keyboard:KeyK": "K",
  "keyboard:KeyL": "L",
  "keyboard:KeyM": "M",
  "keyboard:KeyN": "N",
  "keyboard:KeyO": "O",
  "keyboard:KeyP": "P",
  "keyboard:KeyQ": "Q",
  "keyboard:KeyR": "R",
  "keyboard:KeyS": "S",
  "keyboard:KeyT": "T",
  "keyboard:KeyU": "U",
  "keyboard:KeyV": "V",
  "keyboard:KeyW": "W",
  "keyboard:KeyX": "X",
  "keyboard:KeyY": "Y",
  "keyboard:KeyZ": "Z",
  "keyboard:Digit1": "1",
  "keyboard:Digit2": "2",
  "keyboard:Digit3": "3",
  "keyboard:Digit4": "4",
  "keyboard:Digit5": "5",
  "keyboard:Digit6": "6",
  "keyboard:Digit7": "7",
  "keyboard:Digit8": "8",
  "keyboard:Digit9": "9",
  "keyboard:Digit0": "0",
  "keyboard:Enter": "Enter",
  "keyboard:Escape": "Esc",
  "keyboard:Backspace": "Backspace",
  "keyboard:Tab": "Tab",
  "keyboard:Space": "Space",
  "controller:0": "A",
  "controller:1": "B",
  "controller:2": "X",
  "controller:3": "Y",
  "controller:4": "LB",
  "controller:5": "RB",
  "controller:6": "LT",
  "controller:7": "RT",
  "controller:8": "Back",
  "controller:9": "Start",
  "controller:10": "LS",
  "controller:11": "RS",
  "controller:12": "Up",
  "controller:13": "Down",
  "controller:14": "Left",
  "controller:15": "Right",
  "mouse:0": "Left Click",
  "mouse:1": "Right Click",
  "mouse:2": "Mouse 2",
  "mouse:3": "Mouse 3",
  "mouse:4": "Mouse 4",
  "mouse:5": "Mouse 5",
  "mouse:6": "Mouse ",
  "mouse:7": "",
  "keyboard:Keyß": "",
};

export const keybinds: Record<KeybindKey, Keybind> = {
  moveLeft: {
    binds: [
      "keyboard:ArrowLeft",
      "keyboard:KeyA",
      "controller:1",
      "controller:2",
    ],
    label: "Move Left",
  },
  moveRight: {
    binds: ["keyboard:ArrowLeft", "keyboard:KeyD", "controller:3"],
    label: "Move Right",
  },
  jump: {
    binds: ["keyboard:Space", "controller:0"],
    label: "Jump",
  },
  attack: {
    binds: ["keyboard:KeyQ", "controller:0"],
    label: "Attack",
  },
  attackSecondary: {
    binds: [],
    label: "Secondary Attack",
  },
  attackTertiary: {
    binds: ["keyboard:Keyß"],
    label: "Tertiary Attack",
  },
  pause: {
    binds: [],
    label: "Pause",
  },
  uiUp: {
    binds: ["keyboard:ArrowUp", "keyboard:KeyW"],
    label: "UI Up",
  },
  uiDown: {
    binds: ["keyboard:ArrowDown", "keyboard:KeyS"],
    label: "UI Down",
  },
  uiLeft: {
    binds: [],
    label: "UI Left",
  },
  uiRight: {
    binds: [],
    label: "UI Right",
  },
  uiSelect: {
    binds: [],
    label: "UI Select",
  },
  uiBack: {
    binds: [],
    label: "UI Back",
  },
};
