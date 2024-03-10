import { ActiveScreen } from 'utils'
import { createZustandStore } from './createZustandStore'

interface GameState {
  activeScreen: ActiveScreen
  setActiveScreen: (name: ActiveScreen['name'], params?: ActiveScreen['params'] | undefined) => void
  isPaused: boolean
  setIsPaused: (isPaused: boolean) => void
  showHud: boolean
  setShowHud: (showHud: boolean) => void
  showMainMenu: boolean
  setShowMainMenu: (showMainMenu: boolean) => void
  showSettingsMenu: boolean
  setShowSettingsMenu: (showSettingsMenu: boolean) => void
  showWireframes: boolean
  setShowWireframes: (wireframe: boolean) => void
  fov: number
  setFov: (fov: number) => void
  dayNightCycleSpeed: number
  setDayNightCycleSpeed: (dayNightCycleSpeed: number) => void
  dayNightCycle: boolean
  setDayNightCycle: (dayNightCycle: boolean) => void
}

export const useGameStore = createZustandStore<GameState>({
  name: 'game',
  data: (set) => ({
    activeScreen: { name: 'game' },
    setActiveScreen: (name, params): void =>
      set({
        activeScreen: {
          name,
          params
        } as ActiveScreen
      }),
    isPaused: false,
    setIsPaused: (isPaused): void => set({ isPaused }),
    showHud: false,
    setShowHud: (showHud): void => set({ showHud }),
    showMainMenu: true,
    setShowMainMenu: (showMainMenu): void => set({ showMainMenu }),
    showSettingsMenu: false,
    setShowSettingsMenu: (showSettingsMenu): void => set({ showSettingsMenu }),
    showWireframes: false,
    setShowWireframes: (showWireframes): void => set({ showWireframes }),
    fov: 75,
    setFov: (fov): void => set({ fov }),
    dayNightCycleSpeed: 1,
    setDayNightCycleSpeed: (dayNightCycleSpeed): void => set({ dayNightCycleSpeed }),
    dayNightCycle: false,
    setDayNightCycle: (dayNightCycle): void => set({ dayNightCycle })
  }),
  persistState: false
})
