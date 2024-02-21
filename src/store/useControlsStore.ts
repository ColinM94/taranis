import { createZustandStore } from "./createZustandStore";

interface ControlsState {
  dPadDown: boolean;
  setDPadDown: (dPadDown: boolean) => void;
  dPadUp: boolean;
  setDPadUp: (dPadUp: boolean) => void;
  dPadLeft: boolean;
  setDPadLeft: (dPadLeft: boolean) => void;
  dPadRight: boolean;
  setDPadRight: (dPadRight: boolean) => void;
  aPressed: boolean;
  setAPressed: (aPressed: boolean) => void;
  bPressed: boolean;
  setBPressed: (bPressed: boolean) => void;
  xPressed: boolean;
  setXPressed: (xPressed: boolean) => void;
  yPressed: boolean;
  setYPressed: (yPressed: boolean) => void;
  startPressed: boolean;
  setStartPressed: (startPressed: boolean) => void;
  pressedButtons: number[];
  setPressedButtons: (pressedButtons: number[]) => void;
}

export const useControlsStore = createZustandStore<ControlsState>({
  name: "groups",
  data: (set) => ({
    pressedButtons: [],
    setPressedButtons: (pressedButtons: number[]) => set({ pressedButtons }),
    dPadDown: false,
    setDPadDown: (dPadDown: boolean) => set({ dPadDown }),
    dPadUp: false,
    setDPadUp: (dPadUp: boolean) => set({ dPadUp }),
    dPadLeft: false,
    setDPadLeft: (dPadLeft: boolean) => set({ dPadLeft }),
    dPadRight: false,
    setDPadRight: (dPadRight: boolean) => set({ dPadRight }),
    aPressed: false,
    setAPressed: (aPressed: boolean) => set({ aPressed }),
    bPressed: false,
    setBPressed: (bPressed: boolean) => set({ bPressed }),
    xPressed: false,
    setXPressed: (xPressed: boolean) => set({ xPressed }),
    yPressed: false,
    setYPressed: (yPressed: boolean) => set({ yPressed }),
    startPressed: false,
    setStartPressed: (startPressed: boolean) => set({ startPressed }),
  }),
  persistState: false,
});
