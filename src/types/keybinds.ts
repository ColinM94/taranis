export interface Keybind {
  keyboardKey: string;
  controllerButton: number;
  label: string;
  isPressed?: boolean;
}

export interface Keybinds {
  moveLeft: Keybind;
  moveRight: Keybind;
  jump: Keybind;
  attack: Keybind;
  attackSecondary: Keybind;
  attackTertiary: Keybind;
  pause: Keybind;
}
