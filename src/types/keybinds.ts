import { keybinds } from "config";

export interface Keybind {
  keyboardKey: string;
  controllerButton: number;
  label: string;
  isPressed?: boolean;
  onPress?: (callback: (isPressed: boolean) => void) => void;
}

export type Keybinds = Record<keyof typeof keybinds, Keybind>;
