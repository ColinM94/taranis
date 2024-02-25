import { Keybind, Keybinds } from "types";
import { createZustandStore } from "../createZustandStore";
import { keybinds } from "config";

interface Actions {
  callbacks: { [key: string]: () => void };
  createCallback: (key: keyof Keybinds, callback: () => void) => () => void;
  updateKeyBind: (key: keyof Keybinds, value: Partial<Keybind>) => void;
  reset: () => void;
}

export const useInput = createZustandStore<Keybinds & Actions>({
  name: "input",
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
    callbacks: {},
    createCallback: (key: keyof Keybinds, callback: () => void) => {
      set((state) => ({
        callbacks: { ...state.callbacks, [key]: callback },
      }));

      return () => {
        set((state) => {
          const tempCallbacks = { ...state.callbacks };
          delete tempCallbacks[key];
          return tempCallbacks;
        });
      };
    },
    reset: () => {
      set(keybinds);
    },
  }),
  persistState: false,
});
