import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { trpc } from "@/utils/trpc"
import { useRouter } from "next/router"

import {
  Container,
  Title,
  Form,
  Block,
  Input,
  Label,
  Submit,
  Error
} from "./styles"

type FormData = {
  question: string
  answers: string[]
}

const Create: React.FC = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors }
  } = useForm<FormData>()

  const [answersAmount, setAnswersAmount] = useState(2)

  const createQuestion = trpc.useMutation("create-question")

  useEffect(() => {
    if (answersAmount == 2) {
      return
    }

    setFocus(`answers.${answersAmount - 1}`)
  }, [answersAmount, setFocus])

  useEffect(() => {
    setFocus("question")
  }, [setFocus])

  const onSubmit = handleSubmit(async ({ question, answers }) => {
    const response = await createQuestion.mutateAsync({
      question,
      answers
    })

    router.push(`/${response.id}`)
  })

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Title>Create a New Poll</Title>
        <Block>
          <Label htmlFor="question">Question</Label>
          <Input
            id="question"
            placeholder="Who am i?"
            {...register("question", { required: true, minLength: 5 })}
          />
          {errors.question && (
            <Error>
              {errors.question.type == "required"
                ? "Question is required"
                : "Question must contain at least 5 characters"}
            </Error>
          )}
        </Block>
        <Block>
          <Label>Answers</Label>
          {Array.from({ length: answersAmount }).map((_, index) => (
            <Input
              key={index}
              id={`answers.${index}`}
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  event.preventDefault()

                  if (index == answersAmount - 1) {
                    setAnswersAmount((prev) => prev + 1)
                  } else {
                    setFocus(`answers.${index + 1}`)
                  }
                } else if (event.code == "Backspace") {
                  if (event.currentTarget.value != "") {
                    return
                  }

                  event.preventDefault()

                  if (index == 1) {
                    setFocus("answers.0")
                  } else if (index > 1) {
                    setFocus(`answers.${index - 1}`)
                    setAnswersAmount((prev) => prev - 1)
                  }
                }
              }}
              {...register(`answers.${index}`, { required: true })}
            />
          ))}
          {errors.answers && <Error>You must provide answers</Error>}
        </Block>
        <Submit type="submit" disabled={createQuestion.isLoading}>
          {createQuestion.isLoading ? "Loading ..." : "Create!"}
        </Submit>
      </Form>
    </Container>
  )
}

export default Create
