export const addToStorageList = <T>(key: string, item: T): boolean => {
  const storageItem = localStorage.getItem(key)

  try {
    if (!storageItem) {
      localStorage.setItem(key, JSON.stringify([item]))

      return true
    }

    const parsedStorageitem = JSON.parse(storageItem)

    if (!Array.isArray(parsedStorageitem)) {
      return false
    }

    localStorage.setItem(key, JSON.stringify([...parsedStorageitem, item]))

    return true
  } catch (_) {
    return false
  }
}
