import { createZustandStore } from "./createZustandStore";

interface GameState {
  activeScreen: string;
  setActiveScreen: (activeScreen: string) => void;
  game: Phaser.Game | null;
  setGame: (game: Phaser.Game) => void;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  showHud: boolean;
  setShowHud: (showHud: boolean) => void;
  showMainMenu: boolean;
  setShowMainMenu: (showMainMenu: boolean) => void;
  showSettingsMenu: boolean;
  setShowSettingsMenu: (showSettingsMenu: boolean) => void;
}

export const useGameStore = createZustandStore<GameState>({
  name: "game",
  data: (set) => ({
    activeScreen: "preloader",
    setActiveScreen: (activeScreen) => set({ activeScreen }),
    game: null,
    setGame: (game) => set({ game }),
    isPaused: false,
    setIsPaused: (isPaused) => set({ isPaused }),
    showHud: false,
    setShowHud: (showHud) => set({ showHud }),
    showMainMenu: true,
    setShowMainMenu: (showMainMenu) => set({ showMainMenu }),
    showSettingsMenu: false,
    setShowSettingsMenu: (showSettingsMenu) => set({ showSettingsMenu }),
  }),
  persistState: false,
});
