import { Keybind, Keybinds } from "types";
import { createZustandStore } from "../createZustandStore";
import { keybinds } from "config";

interface Actions {
  callbacks: { [key: string]: (isPressed: boolean) => void };
  createCallback: (
    key: keyof Keybinds,
    callback: (isPressed: boolean) => void
  ) => () => void;
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
    createCallback: (key, callback) => {
      set((state) => ({
        callbacks: {
          ...state.callbacks,
          [key]: callback,
        },
      }));

      return () => {
        set((state) => {
          const callbacks = { ...state.callbacks };
          delete callbacks[key];
          return { callbacks };
        });
      };
    },
    reset: () => {
      set(keybinds);
    },
  }),
  persistState: true,
});
