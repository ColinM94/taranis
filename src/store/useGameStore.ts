import { createZustandStore } from "./createZustandStore";

interface GameState {
  game: Phaser.Scene | null;
  setGame: (game: Phaser.Scene) => void;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  showHud: boolean;
  setShowHud: (showHud: boolean) => void;
  showMainMenu: boolean;
  setShowMainMenu: (showMainMenu: boolean) => void;
  showSettingsMenu: boolean;
  setShowSettingsMenu: (showSettingsMenu: boolean) => void;
  controllerBindings: {
    [key: string]: number;
  };
  setControllerBindings: (controllerBindings: {
    [key: string]: number;
  }) => void;
}

export const useGameStore = createZustandStore<GameState>({
  name: "game",
  data: (set) => ({
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
    controllerBindings: {
      jump: 0,
      moveLeft: 14,
      moveRight: 15,
      primaryAttack: 2,
      secondaryAttack: 3,
      tertiaryAttack: 1,
    },
    setControllerBindings: (controllerBindings) => set({ controllerBindings }),
  }),
  persistState: false,
});
