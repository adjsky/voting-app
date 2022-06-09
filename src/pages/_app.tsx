import { withTRPC } from "@trpc/next"

import type { AppProps } from "next/app"
import type { AppRouter } from "@/pages/api/trpc/[trpc]"

import "@/styles/resets.css"
import "@/styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default withTRPC<AppRouter>({
  config() {
    const isBrowser = typeof window != "undefined"

    const url = isBrowser
      ? "/api/trpc"
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc"

    return {
      url,
      queryClientConfig: {
        defaultOptions: { queries: { refetchOnWindowFocus: false } }
      }
    }
  },
  ssr: false
})(MyApp)
