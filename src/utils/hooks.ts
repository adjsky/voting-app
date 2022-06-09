import { useEffect, useState, useCallback } from "react"
import Cookies from "js-cookie"

import { addToStorageList } from "./helpers"

export const useVoted = (id: string | null) => {
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

  const markVoted = useCallback(() => {
    addToStorageList("voted", id)
    setVoted(true)
  }, [id])

  useEffect(() => {
    check()

    return () => setVoted(null)
  }, [id, check])

  return { voted, markVoted }
}

export const useAuthor = (creatorToken: string | null) => {
  const [author, setAuthor] = useState<boolean | null>(null)

  useEffect(() => {
    const callback = setAuthor(null)

    if (creatorToken == null) {
      return callback
    }

    const token = Cookies.get("token")

    if (!token) {
      return callback
    }

    setAuthor(token == creatorToken)

    return callback
  }, [creatorToken])

  return { author }
}
