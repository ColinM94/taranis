import { Bind, Keybind } from "types";

export type KeybindKey =
  | "moveLeft"
  | "moveRight"
  | "moveDown"
  | "moveUp"
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
  | "uiBack"
  | "zoomIn"
  | "zoomOut"
  | "cameraLeft"
  | "cameraRight"
  | "cameraDown"
  | "cameraUp";

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
  "keyboard:Minus": "-",
  "keyboard:Equal": "=",
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
  "mouse:WheelUp": "",
  "mouse:WheelDown": "",
};

export const keybinds: Record<KeybindKey, Keybind> = {
  moveLeft: {
    binds: ["keyboard:KeyA", "controller:14"],
    label: "Move Left",
  },
  moveRight: {
    binds: ["keyboard:KeyD", "controller:15"],
    label: "Move Right",
  },
  moveDown: {
    binds: ["keyboard:KeyS", "controller:13"],
    label: "Move Down",
  },
  moveUp: {
    binds: ["keyboard:KeyW", "controller:12"],
    label: "Move Up",
  },
  // moveLeft: {
  //   binds: ["controller:14"],
  //   label: "Move Left",
  // },
  // moveRight: {
  //   binds: ["controller:15"],
  //   label: "Move Right",
  // },
  // moveDown: {
  //   binds: ["controller:13"],
  //   label: "Move Down",
  // },
  // moveUp: {
  //   binds: ["controller:12"],
  //   label: "Move Up",
  // },
  jump: {
    binds: ["keyboard:Space", "controller:0"],
    label: "Jump",
  },
  attack: {
    binds: ["keyboard:KeyQ", "controller:0"],
    label: "Attack",
  },
  attackSecondary: {
    binds: ["keyboard:KeyE"],
    label: "Secondary Attack",
  },
  attackTertiary: {
    binds: ["keyboard:Keyß"],
    label: "Tertiary Attack",
  },
  pause: {
    binds: ["keyboard:Escape", "controller:9"],
    label: "Pause",
  },
  uiUp: {
    binds: ["keyboard:ArrowUp", "keyboard:KeyW", "controller:12"],
    label: "UI Up",
  },
  uiDown: {
    binds: ["keyboard:ArrowDown", "keyboard:KeyS", "controller:13"],
    label: "UI Down",
  },
  uiLeft: {
    binds: ["keyboard:ArrowLeft", "controller:14"],
    label: "UI Left",
  },
  uiRight: {
    binds: ["keyboard:ArrowRight", "controller:15"],
    label: "UI Right",
  },
  uiSelect: {
    binds: ["keyboard:Enter", "controller:0"],
    label: "UI Select",
  },
  uiBack: {
    binds: ["keyboard:Escape", "controller:1", "controller:8"],
    label: "UI Back",
  },
  zoomIn: {
    binds: ["keyboard:Equal", "mouse:WheelUp"],
    label: "Zoom In",
  },
  zoomOut: {
    binds: ["keyboard:Minus", "mouse:WheelDown"],
    label: "Zoom Out",
  },
  cameraLeft: {
    binds: ["keyboard:ArrowLeft"],
    label: "Camera Left",
  },
  cameraRight: {
    binds: ["keyboard:ArrowRight"],
    label: "Camera Right",
  },
  cameraDown: {
    binds: ["keyboard:ArrowDown"],
    label: "Camera Down",
  },
  cameraUp: {
    binds: ["keyboard:ArrowUp"],
    label: "Camera Up",
  },
  // cameraLeft: {
  //   binds: ["keyboard:KeyA", "keyboard:ArrowLeft"],
  //   label: "Camera Left",
  // },
  // cameraRight: {
  //   binds: ["keyboard:KeyD", "keyboard:ArrowRight"],
  //   label: "Camera Right",
  // },
  // cameraDown: {
  //   binds: ["keyboard:KeyS", "keyboard:ArrowDown"],
  //   label: "Camera Down",
  // },
  // cameraUp: {
  //   binds: ["keyboard:KeyW", "keyboard:ArrowUp"],
  //   label: "Camera Up",
  // },
};
