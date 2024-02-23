import { createZustandStore } from "./createZustandStore";

export interface KeyBind {
  keyboardKey: string;
  controllerButton: number;
  label: string;
}

export interface KeyBinds {
  moveLeft: KeyBind;
  moveRight: KeyBind;
  jump: KeyBind;
  attack: KeyBind;
  attackSecondary: KeyBind;
  attackTertiary: KeyBind;
}

export interface KeyBindsState extends KeyBinds {
  updateKeyBind: (key: keyof KeyBinds, value: KeyBind) => void;
}

export const useKeyBindsStore = createZustandStore<KeyBindsState>({
  name: "keyBinds",
  data: (set) => ({
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
    updateKeyBind: (key, value) =>
      set((state) => ({ [key]: { ...state[key], ...value } })),
  }),
});
