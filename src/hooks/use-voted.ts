import { useEffect, useState, useCallback } from "react"
import { modifyStorageList } from "@/utils/helpers"

const useVoted = (id: string | null) => {
  const [voted, setVoted] = useState<boolean | null>(null)

  const check = useCallback(() => {
    if (id == null) {
      return
    }

    const voted = localStorage.getItem("voted")

    if (!voted) {
      setVoted(false)

      return
    }

    try {
      const parsedVoted = JSON.parse(voted)

      if (!Array.isArray(parsedVoted)) {
        setVoted(false)

        return
      }

      setVoted(parsedVoted.includes(id))
    } catch (_) {
      setVoted(false)
    }
  }, [id])

  const markVoted = useCallback(
    (condition: boolean) => {
      modifyStorageList("voted", id, condition ? "add" : "remove")
      setVoted(condition)
    },
    [id]
  )

  useEffect(() => {
    check()

    return () => setVoted(null)
  }, [id, check])

  return { voted, markVoted }
}

export default useVoted
