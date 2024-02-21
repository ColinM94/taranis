import { createZustandStore } from "./createZustandStore";

export interface KeyBind {
  keyboardKey: string;
  controllerButton: number;
  action: string;
  isPressed?: boolean;
}

export interface KeyBindsState {
  moveLeft: KeyBind;
  updateMoveLeft: (update: Partial<KeyBind>) => void;
  onMoveLeftCallback: () => void;
  setMoveLeftCallback: (callback: () => void) => void;
  moveRight: KeyBind;
  onMoveRightCallback: () => void;
  setMoveRightCallback: (callback: () => void) => void;
  jump: KeyBind;
  attack: KeyBind;
  attackSecondary: KeyBind;
  attackTertiary: KeyBind;
}

export const useKeyBindsStore = createZustandStore<KeyBindsState>({
  name: "keyBindings",
  data: (set) => ({
    moveLeft: {
      keyboardKey: "a",
      controllerButton: 14,
      action: "moveLeft",
      isPressed: false,
    },
    updateMoveLeft: (update) => {
      set({});
    },

    onMoveLeftCallback: () => {},
    setMoveLeftCallback: (callback) => set({ onMoveLeftCallback: callback }),
    moveRight: {
      keyboardKey: "d",
      controllerButton: 15,
      action: "moveRight",
      isPressed: false,
    },
    onMoveRightCallback: () => {},
    setMoveRightCallback: (callback) => set({ onMoveRightCallback: callback }),
    jump: {
      keyboardKey: " ",
      controllerButton: 0,
      action: "jump",
      isPressed: false,
    },
    attack: {
      keyboardKey: "q",
      controllerButton: 1,
      action: "attack",
      isPressed: false,
    },
    attackSecondary: {
      keyboardKey: "r",
      controllerButton: 2,
      action: "attackSecondary",
      isPressed: false,
    },
    attackTertiary: {
      keyboardKey: "e",
      controllerButton: 3,
      action: "attackTertiary",
      isPressed: false,
    },
  }),
  persistState: false,
});
