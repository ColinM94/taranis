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
}

interface GameActions {
  update: (data: Partial<GameState>) => void
}

export const useGameStore = createZustandStore<GameState & GameActions>({
  name: 'game',
  data: (set) => ({
    activeScreen: { name: 'settings' },
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
    update: (data): void => set(data)
  }),
  persistState: false
})
