import { keybinds } from "config";

export interface Keybind {
  keyboardKeys: string[];
  controllerButtons: number[];
  label: string;
  isPressed?: boolean;
  callbacks?: { [key: string]: (isPressed: boolean) => void };
  onPress?: (callback: () => void) => void;
}

export type Keybinds = Record<keyof typeof keybinds, Keybind>;
