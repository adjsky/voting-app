import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"

export function createContext(opts?: trpcNext.CreateNextContextOptions) {
  return {
    req: opts?.req
  }
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

// Helper function to create a router with your app's context
export function createRouter() {
  return trpc.router<Context>()
}
