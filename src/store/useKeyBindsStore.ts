import { createZustandStore } from "./createZustandStore";

export interface KeyBind {
  keyboardKey: string;
  controllerButton: number;
  isPressed?: boolean;
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
  setKeyBind: (key: keyof KeyBindsState, value: KeyBind) => void;
  setIsPressed: (key: keyof KeyBinds, value: boolean) => void;
}

export const useKeyBindsStore = createZustandStore<KeyBindsState>({
  name: "keyBindings",
  data: (set) => ({
    moveLeft: {
      keyboardKey: "a",
      controllerButton: 14,
    },
    moveRight: {
      keyboardKey: "d",
      controllerButton: 15,
    },
    jump: {
      keyboardKey: " ",
      controllerButton: 0,
      isPressed: false,
    },
    attack: {
      keyboardKey: "q",
      controllerButton: 1,
      isPressed: false,
    },
    attackSecondary: {
      keyboardKey: "r",
      controllerButton: 2,
      isPressed: false,
    },
    attackTertiary: {
      keyboardKey: "e",
      controllerButton: 3,
      isPressed: false,
    },
    setIsPressed: (key, value) =>
      set((state) => ({ [key]: { ...state[key], isPressed: value } })),
    setKeyBind: (key, value) => set({ [key]: value }),
  }),
  persistState: true,
});
