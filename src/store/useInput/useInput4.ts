import { Keybind, Keybinds } from "types";
import { createZustandStore } from "../createZustandStore";
import { keybinds } from "config";

interface Actions {
  updateKeyBind: (key: keyof Keybinds, value: Partial<Keybind>) => void;
  reset: () => void;
}

export const useInput4 = createZustandStore<Keybinds & Actions>({
  name: "input4",
  data: (set) => ({
    ...keybinds,
    updateKeyBind: (key, value) => {
      set((state) => ({
        [key]: {
          ...state[key],
          ...value,
        },
      }));
    },
    reset: () => {
      set(keybinds);
    },
  }),
  persistState: true,
});
