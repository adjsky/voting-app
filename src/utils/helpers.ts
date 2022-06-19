export const modifyStorageList = <T>(
  key: string,
  item: T,
  action: "remove" | "add"
): boolean => {
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

    localStorage.setItem(
      key,
      JSON.stringify(
        action == "add"
          ? [...parsedStorageitem, item]
          : parsedStorageitem.filter((parsedItem) => item != parsedItem)
      )
    )

    return true
  } catch (_) {
    return false
  }
}
