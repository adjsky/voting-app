import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import env from "@/utils/env"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: env.googleClientId,
      clientSecret: env.googleClientSecret
    })
  ]
})
