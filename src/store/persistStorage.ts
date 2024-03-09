import { StorageValue } from 'zustand/middleware'

const getDbConnection = async (store: string): Promise<IDBDatabase> => {
  const connection = indexedDB.open('h5GamesDb', 4)

  return new Promise<IDBDatabase>((resolve) => {
    connection.onsuccess = (): void => {
      resolve(connection.result)
    }

    connection.onupgradeneeded = (): void => {
      const db = connection.result

      if (!db.objectStoreNames.contains(store)) {
        db.createObjectStore(store)
      }
    }
  })
}

export const setStoreData = async <T>(store: string, data: StorageValue<T>): Promise<void> => {
  const db = await getDbConnection(store)

  const request: IDBRequest = db
    .transaction(store, 'readwrite')
    .objectStore(store)
    .put(JSON.stringify(data), data.version)

  return new Promise<void>((resolve) => {
    request.onsuccess = (): void => {
      resolve()
    }

    request.onerror = (error): void => {
      reportError(error)
    }
  })
}

export const getStoreData = async <T>(store: string): Promise<StorageValue<T>> => {
  const db = await getDbConnection(store)

  const request: IDBRequest = db.transaction(store, 'readwrite').objectStore(store).get(0)

  return new Promise<StorageValue<T>>((resolve) => {
    request.onsuccess = (): void => {
      resolve(JSON.parse(request.result))
    }

    request.onerror = (error): void => {
      reportError(error)
    }
  })
}

export const removeStoreData = async (store: string): Promise<void> => {
  const db = await getDbConnection(store)

  const request: IDBRequest = db.transaction(store, 'readwrite').objectStore(store).clear()

  return new Promise<void>((resolve) => {
    request.onsuccess = (): void => {
      resolve()
    }

    request.onerror = (error): void => {
      reportError(error)
    }
  })
}
