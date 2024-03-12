import { InputSlider, InputToggle } from 'components'
import { useConfigStore } from 'store'

import { Props } from './types'
import styles from './styles.module.scss'

export const SettingsGraphics = ({ headingClassName }: Props): JSX.Element => {
  const config = useConfigStore()

  return (
    <>
      <div className={styles.option}>
        <div className={styles.optionLabel}>Show Wireframes</div>
        <div className={styles.optionInput}>
          <InputToggle
            value={config.showWireframes}
            setValue={(showWireframes) => config.update({ showWireframes })}
          />
        </div>
      </div>

      <div className={styles.option}>
        <div className={styles.optionLabel}>Show Physics Debug</div>
        <div className={styles.optionInput}>
          <InputToggle
            value={config.showPhysicsDebug}
            setValue={(showPhysicsDebug) => config.update({ showPhysicsDebug })}
          />
        </div>
      </div>
      <div className={styles.option}>
        <div className={styles.optionLabel}>Day/Night Cycle</div>

        <div className={styles.optionInput}>
          <InputToggle
            value={config.dayNightCycle}
            setValue={(dayNightCycle) => config.update({ dayNightCycle })}
          />
        </div>
      </div>

      <div className={styles.option}>
        <div className={styles.optionLabel}>Day/Night Cycle Speed</div>
        <div className={styles.optionInput}>
          <InputSlider
            value={config.dayNightCycleSpeed}
            setValue={(dayNightCycleSpeed) => config.update({ dayNightCycleSpeed })}
            min={100}
            max={500}
          />
        </div>
      </div>

      <div className={styles.option}>
        <div className={styles.optionLabel}>Field of View</div>
        <div className={styles.optionInput}>
          <InputSlider
            value={config.fov}
            setValue={(fov) => config.update({ fov })}
            min={70}
            max={120}
          />
        </div>
      </div>
    </>
  )
}
