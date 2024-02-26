import { Keybinds } from "types";

export interface Props {
  type: "keyboard" | "controller";
  keybindKey: keyof Keybinds;
  isSelected: boolean;
  label: string;
  onClick: () => void;
}
