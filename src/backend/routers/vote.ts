import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { getSession } from "next-auth/react"

import { prisma } from "@/db/client"
import { createRouter } from "../context"

const router = createRouter()
  .query("get-question", {
    input: z.string(),
    resolve({ input }) {
      return prisma.question.findFirst({
        where: { id: input },
        include: {
          answers: {
            orderBy: {
              id: "asc"
            }
          }
        }
      })
    }
  })
  .mutation("create-question", {
    input: z.object({
      question: z.string(),
      answers: z.array(z.string())
    }),
    async resolve({ input: { question, answers }, ctx: { req } }) {
      const session = await getSession({ req })

      if (!session) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
      }

      return prisma.question.create({
        data: {
          creator: session.user.email,
          question,
          answers: {
            createMany: {
              data: answers.map((answer) => ({
                answer
              }))
            }
          }
        }
      })
    }
  })
  .mutation("make-vote", {
    input: z.number().int(),
    async resolve({ input }) {
      return prisma.answer.update({
        where: { id: input },
        data: {
          votes: {
            increment: 1
          }
        }
      })
    }
  })

export default router
