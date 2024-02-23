import { createZustandStore } from "./createZustandStore";
import { KeyBinds } from "./useKeyBindsStore";

export type KeysState = {
  [key in keyof KeyBinds]: boolean;
};

export type KeysActions = {
  setIsPressed: (key: keyof KeyBinds, value: boolean) => void;
};

export const useKeys = createZustandStore<KeysState & KeysActions>({
  name: "keys",
  data: (set) => ({
    attack: false,
    attackSecondary: false,
    attackTertiary: false,
    jump: false,
    moveLeft: false,
    moveRight: false,
    setIsPressed: (key, value) => set({ [key]: value }),
  }),
  persistState: false,
});
