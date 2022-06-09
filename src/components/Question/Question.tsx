import React from "react"
import { useRouter } from "next/router"

import { Container, Title, Vote, Loader } from "./styles"

import { trpc } from "@/utils/trpc"
import { useVoted, useAuthor } from "@/utils/hooks"

const Question: React.FC = () => {
  const router = useRouter()

  const typedQuestionId =
    typeof router.query.questionId == "string" ? router.query.questionId : null

  const vote = trpc.useMutation(["make-vote"])
  const question = trpc.useQuery(["get-question", typedQuestionId || ""], {
    enabled: typedQuestionId != null
  })
  const { voted, markVoted } = useVoted(typedQuestionId)
  const { author } = useAuthor(question.data ? question.data.creator : null)

  const canVote = voted == false && author == false

  const onVote = async (id: number) => {
    await vote.mutateAsync(id)
    await question.refetch()

    markVoted()
  }

  if (
    question.isIdle ||
    question.isLoading ||
    voted == null ||
    author == null
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

  return (
    <Container>
      <Title>{question.data.question}</Title>
      {question.data.answers.map((answer) => (
        <p key={answer.id}>
          <span>
            {answer.answer} - {answer.votes}
          </span>{" "}
          {canVote && <Vote onClick={() => onVote(answer.id)}>vote</Vote>}
        </p>
      ))}
    </Container>
  )
}

export default Question
