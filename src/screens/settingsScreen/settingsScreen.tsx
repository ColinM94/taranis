import * as React from 'react'

import { navigate } from 'utils'
import { useInput } from 'store'
import { Settings } from 'components'

export const SettingsScreen = (): JSX.Element => {
  const input = useInput()

  React.useEffect(() => {
    const unsubscribe = input.createCallback('uiBack', () => {
      navigate('mainMenu')
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return <Settings type={'mainMenu'} />
}
