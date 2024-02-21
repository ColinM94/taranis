import { createZustandStore } from "./createZustandStore";

interface GameState {
  health: number;
  setHealth: (health: number) => void;
  weapon: string;
  setWeapon: (weapon: string) => void;
}

export const usePlayerStore = createZustandStore<GameState>({
  name: "player",
  data: (set) => ({
    health: 100,
    setHealth: (health: number) => set({ health }),
    weapon: "sword",
    setWeapon: (weapon: string) => set({ weapon }),
  }),
  persistState: false,
});
