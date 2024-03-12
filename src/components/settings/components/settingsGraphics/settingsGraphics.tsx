import { InputSlider, InputToggle } from 'components'
import { useConfigStore } from 'store'

import { Props } from './types'

export const SettingsGraphics = ({ headingClassName }: Props): JSX.Element => {
  const config = useConfigStore()

  return (
    <>
      <div className={headingClassName}>Field of View</div>
      <InputSlider
        value={config.fov}
        setValue={(fov) => config.update({ fov })}
        min={70}
        max={120}
      />

      <div className={headingClassName}>Show Wireframes</div>
      <InputToggle
        value={config.showWireframes}
        setValue={(showWireframes) => config.update({ showWireframes })}
      />

      <div className={headingClassName}>Show Physics Debug</div>
      <InputToggle
        value={config.showPhysicsDebug}
        setValue={(showPhysicsDebug) => config.update({ showPhysicsDebug })}
      />

      <div className={headingClassName}>Day/Night Cycle</div>
      <InputToggle
        value={config.dayNightCycle}
        setValue={(dayNightCycle) => config.update({ dayNightCycle })}
      />

      <div className={headingClassName}>Day/Night Cycle Speed</div>
      <InputSlider
        value={config.dayNightCycleSpeed}
        setValue={(dayNightCycleSpeed) => config.update({ dayNightCycleSpeed })}
        min={100}
        max={500}
      />
      <div className={headingClassName}>Field of View</div>
      <InputSlider
        value={config.fov}
        setValue={(fov) => config.update({ fov })}
        min={70}
        max={120}
      />
    </>
  )
}
