import * as React from 'react'

import { InputOptions, InputSlider, InputToggle } from 'components'
import { useConfigStore } from 'store'

import { Props } from './types'
import styles from './styles.module.scss'

export const SettingsGraphics = ({ headingClassName }: Props): JSX.Element => {
  const config = useConfigStore()

  return (
    <>
      {/* <div className={styles.option}>
         <div className={styles.optionLabel}>Show Wireframes</div>
        <div className={styles.optionInput}>
          <InputOptions
            value={config.showWireframes}
            setValue={(showWireframes) => config.update({ showWireframes })}
            options={[{ label: 'Off' }, { label: 'On' }]}
          />
        </div>
      </div>
       */}

      <div className={styles.option}>
        <div className={styles.optionLabel}>Graphics Quality</div>
        <div className={styles.optionInput}>
          <InputOptions
            value={config.graphicsQuality}
            setValue={(graphicsQuality) => config.update({ graphicsQuality })}
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' }
            ]}
          />
        </div>
      </div>

      <div className={styles.option}>
        <div className={styles.optionLabel}>Show Wireframes</div>

        <div className={styles.optionInput}>
          <InputOptions
            value={config.showWireframes}
            setValue={(showWireframes) => config.update({ showWireframes })}
            options={[
              { value: false, label: 'Off' },
              { value: true, label: 'On' }
            ]}
          />
        </div>
      </div>

      <div className={styles.option}>
        <div className={styles.optionLabel}>Show Physics Debug</div>
        <div className={styles.optionInput}>
          <InputOptions
            value={config.showPhysicsDebug}
            setValue={(showPhysicsDebug) => config.update({ showPhysicsDebug })}
            options={[
              { value: false, label: 'Off' },
              { value: true, label: 'On' }
            ]}
          />
        </div>
      </div>

      <div className={styles.option}>
        <div className={styles.optionLabel}>Day/Night Cycle</div>
        <div className={styles.optionInput}>
          <InputOptions
            value={config.dayNightCycle}
            setValue={(dayNightCycle) => config.update({ dayNightCycle })}
            options={[
              { value: false, label: 'Off' },
              { value: true, label: 'On' }
            ]}
          />
        </div>
      </div>

      {/*
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
      </div> */}
    </>
  )
}
