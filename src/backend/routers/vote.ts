import { z } from "zod"
import { TRPCError } from "@trpc/server"

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
    resolve({ input: { question, answers }, ctx: { token } }) {
      if (!token) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
      }

      return prisma.question.create({
        data: {
          creator: token,
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
    resolve({ input, ctx: { token } }) {
      if (!token) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
      }

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
