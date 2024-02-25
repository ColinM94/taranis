import { Keybinds } from "types";

export interface Props {
  keybindKey: keyof Keybinds;
  isSelected: boolean;
  label: string;
  controllerKey: string;
  keyboardKey: string;
  onClick: () => void;
}
