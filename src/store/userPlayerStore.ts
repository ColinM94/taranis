import { createZustandStore } from './createZustandStore'

interface GameState {
  health: number
  weapon: string

  setHealth: (health: number) => void
  setWeapon: (weapon: string) => void
}

export const usePlayerStore = createZustandStore<GameState>({
  name: 'player',
  data: (set) => ({
    health: 100,
    weapon: 'sword',

    setHealth: (health): void => set({ health }),
    setWeapon: (weapon): void => set({ weapon })
  }),
  persistState: false
})
