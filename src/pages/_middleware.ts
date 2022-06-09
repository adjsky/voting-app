import { NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"

export const middleware = (req: NextRequest) => {
  const token = req.cookies.token

  if (token) {
    return
  }

  const generated = nanoid()

  const response = NextResponse.redirect(req.nextUrl)

  response.cookie("token", generated, { sameSite: "strict" })

  return response
}
