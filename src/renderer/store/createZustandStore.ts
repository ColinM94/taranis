import { StoreApi, UseBoundStore, create } from 'zustand'
import { PersistOptions, PersistStorage, createJSONStorage, persist } from 'zustand/middleware'
import { getStoreData, removeStoreData, setStoreData } from './persistStorage'

type Set<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined
) => void

interface Config<T> extends Omit<PersistOptions<T>, 'partialize'> {
  name: string
  data: (set: Set<T>) => T
  /** Store state in local storage */
  persistState?: boolean
  // partialize?: (state: T) => Partial<T>;
  storageType?: 'localStorage' | 'sessionStorage' | 'indexedDB'
}

export const createZustandStore = <T>(config: Config<T>): UseBoundStore<StoreApi<T>> => {
  const { name, data, persistState, storageType, ...rest } = config

  if (!persistState) {
    const store = create<T>((set) => data(set))
    return store
  }

  const storage = (): PersistStorage<T> | undefined => {
    if (storageType === 'indexedDB') {
      const indexedDb: PersistStorage<T> = {
        setItem: (key, value) => setStoreData<T>(key, value),
        getItem: (key) => getStoreData<T>(key),
        removeItem: (key) => removeStoreData(key)
      }

      return indexedDb
    }

    if (storageType === 'sessionStorage') {
      return createJSONStorage(() => sessionStorage)
    }

    return createJSONStorage(() => localStorage)
  }

  const persistOptions: PersistOptions<T> = {
    name: name,
    storage: storage(),
    ...rest
  }

  const store = create(persist((set) => data(set), persistOptions))
  return store
}
