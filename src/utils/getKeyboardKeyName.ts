import { capitaliseFirstLetter } from './capitaliseFirstLetter'

/** Takes KeyboardEvent key and return name of key. */
export const getKeyboardKeyName = (key: string) => {
  if (key === ' ') return 'Space'

  return capitaliseFirstLetter(key)
}
