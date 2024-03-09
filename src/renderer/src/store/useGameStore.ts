import { ActiveScreen } from "utils";
import { createZustandStore } from "./createZustandStore";

interface GameState {
  activeScreen: ActiveScreen;
  setActiveScreen: (
    name: ActiveScreen["name"],
    params?: ActiveScreen["params"]
  ) => void;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  showHud: boolean;
  setShowHud: (showHud: boolean) => void;
  showMainMenu: boolean;
  setShowMainMenu: (showMainMenu: boolean) => void;
  showSettingsMenu: boolean;
  setShowSettingsMenu: (showSettingsMenu: boolean) => void;
  showWireframes: boolean;
  setShowWireframes: (wireframe: boolean) => void;
  fov: number;
  setFov: (fov: number) => void;
  dayNightCycleSpeed: number;
  setDayNightCycleSpeed: (dayNightCycleSpeed: number) => void;
  dayNightCycle: boolean;
  setDayNightCycle: (dayNightCycle: boolean) => void;
}

export const useGameStore = createZustandStore<GameState>({
  name: "game",
  data: (set) => ({
    activeScreen: { name: "game", params: undefined } as any,
    setActiveScreen: (name, params) =>
      set({
        activeScreen: {
          name,
          params,
        } as any,
      }),
    isPaused: false,
    setIsPaused: (isPaused) => set({ isPaused }),
    showHud: false,
    setShowHud: (showHud) => set({ showHud }),
    showMainMenu: true,
    setShowMainMenu: (showMainMenu) => set({ showMainMenu }),
    showSettingsMenu: false,
    setShowSettingsMenu: (showSettingsMenu) => set({ showSettingsMenu }),
    showWireframes: false,
    setShowWireframes: (showWireframes) => set({ showWireframes }),
    fov: 75,
    setFov: (fov) => set({ fov }),
    dayNightCycleSpeed: 1,
    setDayNightCycleSpeed: (dayNightCycleSpeed) => set({ dayNightCycleSpeed }),
    dayNightCycle: false,
    setDayNightCycle: (dayNightCycle) => set({ dayNightCycle }),
  }),
  persistState: false,
});
