import { createZustandStore } from './createZustandStore'

interface PlayerState {
  gold: number
  setGold: (gold: number) => void

  stone: number
  setStone: (stone: number) => void

  wood: number
  setWood: (wood: number) => void

  food: number
  setFood: (food: number) => void
}

export const usePlayerStore = createZustandStore<PlayerState>({
  name: 'player',
  data: (set) => ({
    gold: 0,
    setGold: (gold) => set({ gold }),

    stone: 0,
    setStone: (stone) => set({ stone }),

    wood: 0,
    setWood: (wood) => set({ wood }),

    food: 0,
    setFood: (food) => set({ food }),
  }),
  persistState: true,
})
