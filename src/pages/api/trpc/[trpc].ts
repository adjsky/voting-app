import * as trpcNext from "@trpc/server/adapters/next"

import vote from "@/backend/routers/vote"
import { createRouter, createContext } from "@/backend/context"

export const appRouter = createRouter().merge(vote)

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext
})
