import { createZustandStore } from "./createZustandStore";
import { KeyBinds } from "./useInput";

export type KeysState = {
  // [key in keyof KeyBinds]: boolean;
  pressedKeys: Record<string, boolean>;
};

export type KeysActions = {
  // setIsPressed: (key: keyof KeyBinds, value: boolean) => void;
  setPressed: (key: string, value: boolean) => void;
};

export const useKeys = createZustandStore<KeysState & KeysActions>({
  name: "keys",
  data: (set) => ({
    // attack: false,
    // attackSecondary: false,
    // attackTertiary: false,
    // jump: false,
    // moveLeft: false,
    // moveRight: false,
    pressedKeys: {},
    setPressed: (key, value) => set({ [key]: value }),
    // setIsPressed: (key, value) => set({ [key]: value }),
  }),
  persistState: false,
});
