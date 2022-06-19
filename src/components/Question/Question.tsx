import React from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import Loader from "@/shared/Loader"
import { Container, Title, Vote } from "./styles"

import { trpc } from "@/utils/trpc"
import useVoted from "@/hooks/use-voted"

const Question: React.FC = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const typedQuestionId =
    typeof router.query.questionId == "string" ? router.query.questionId : null

  const queryClient = trpc.useContext()
  const vote = trpc.useMutation(["make-vote"], {
    onMutate: async (id: number) => {
      const previousQuestion = queryClient.getQueryData([
        "get-question",
        typedQuestionId || ""
      ])

      if (previousQuestion == undefined) {
        return
      }

      await queryClient.cancelQuery(["get-question", typedQuestionId || ""])

      queryClient.setQueryData(["get-question", typedQuestionId || ""], {
        ...previousQuestion,
        answers: previousQuestion.answers.map((answer) => {
          if (answer.id != id) {
            return { ...answer }
          }

          return { ...answer, votes: answer.votes + 1 }
        })
      })

      markVoted(true)

      return { previousQuestion }
    },
    onError: (err, vars, ctx) => {
      if (!ctx?.previousQuestion) {
        return
      }

      queryClient.setQueryData(
        ["get-question", typedQuestionId || ""],
        ctx.previousQuestion
      )
      markVoted(false)
    },
    onSettled: () => {
      queryClient.invalidateQueries(["get-question", typedQuestionId || ""])
    }
  })
  const question = trpc.useQuery(["get-question", typedQuestionId || ""], {
    enabled: typedQuestionId != null
  })
  const { voted, markVoted } = useVoted(typedQuestionId)

  if (
    question.isIdle ||
    question.isLoading ||
    voted == null ||
    status == "loading"
  ) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }

  if (question.isError || question.data == null) {
    return <Container>Error</Container>
  }

  const canVote =
    session == null
      ? voted == false
      : session.user.email != question.data.creator

  return (
    <Container>
      <Title>{question.data.question}</Title>
      {question.data.answers.map((answer) => (
        <p key={answer.id}>
          <span>
            {answer.answer} - {answer.votes}
          </span>{" "}
          {canVote && <Vote onClick={() => vote.mutate(answer.id)}>vote</Vote>}
        </p>
      ))}
    </Container>
  )
}

export default Question
