import { Keybind, Keybinds } from "types";
import { createZustandStore } from "./createZustandStore";
import { keybinds } from "consts";

interface Actions {
  updateKeyBind: (key: keyof Keybinds, value: Partial<Keybind>) => void;
  reset: () => void;
}

export const getKeyBindKeys = () => {
  const keys = Object.keys(keybinds) as (keyof Keybinds)[];
  return keys;
};

export const useInput = createZustandStore<Keybinds & Actions>({
  name: "input",
  data: (set) => ({
    ...keybinds,
    updateKeyBind: (key, value) => {
      set((state) => {
        state[key] = { ...state[key], ...value };
        return state;
      });
    },
    reset: () => {
      set(keybinds);
    },
  }),
  persistState: true,
});
