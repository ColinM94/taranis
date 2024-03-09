import { createZustandStore } from "./createZustandStore";

export interface ControllerState {
  0: {
    isConnected: boolean;
  };
  1: {
    isConnected: boolean;
  };
  2: {
    isConnected: boolean;
  };
  3: {
    isConnected: boolean;
  };
}

interface Actions {
  update: (controller: number, isConnected: boolean) => void;
}

export const useControllerStore = createZustandStore<ControllerState & Actions>(
  {
    name: "controller",
    data: (set) => ({
      0: {
        isConnected: false,
      },
      1: {
        isConnected: false,
      },
      2: {
        isConnected: false,
      },
      3: {
        isConnected: false,
      },
      update: (controller, isConnected) => {
        set({ [controller]: { isConnected } });
      },
    }),
    persistState: false,
  }
);
