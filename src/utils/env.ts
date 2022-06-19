const env = {
  googleClientId: process.env.GOOGLE_CLIENT_ID!,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!
}

for (const [key, value] of Object.entries(env)) {
  if (!value) {
    throw new Error(`environment variable ${key} not found`)
  }
}

export default env
