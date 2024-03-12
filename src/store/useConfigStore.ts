import { createZustandStore } from './createZustandStore'

interface ConfigState {
  showWireframes: boolean
  fov: number
  dayNightCycleSpeed: number
  dayNightCycle: boolean
  showPhysicsDebug: boolean
  update: (config: Partial<ConfigState>) => void
}

export const useConfigStore = createZustandStore<ConfigState>({
  name: 'game',
  data: (set) => ({
    showWireframes: false,
    fov: 75,
    dayNightCycleSpeed: 1,
    dayNightCycle: false,
    showPhysicsDebug: false,
    update: (config) => set(config)
  }),
  persistState: false
})
