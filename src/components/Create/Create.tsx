import React, { useEffect, useState } from "react"
import { flushSync } from "react-dom"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import { useSession, signIn } from "next-auth/react"

import { trpc } from "@/utils/trpc"

import Loader from "@/shared/Loader"
import {
  Container,
  LoadingContainer,
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
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn("google")
    }
  })
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
    if (status == "loading") {
      return
    }

    setFocus("question")
  }, [setFocus, status])

  const onSubmit = handleSubmit(async ({ question, answers }) => {
    const response = await createQuestion.mutateAsync({
      question,
      answers
    })

    router.push(`/${response.id}`)
  })

  const handleEnter = (index: number) => {
    if (index != answersAmount - 1) {
      setFocus(`answers.${index + 1}`)

      return
    }

    modifyAnswersFields("add")
  }

  const handleBackspace = (index: number) => {
    if (index < 1) {
      return
    }

    if (index == 1) {
      setFocus("answers.0")

      return
    }

    modifyAnswersFields("remove")
  }

  const modifyAnswersFields = (action: "remove" | "add") => {
    const modifiedFieldsAmount =
      action == "add" ? answersAmount + 1 : answersAmount - 1

    flushSync(() => setAnswersAmount(modifiedFieldsAmount))

    const indexToFocus = action == "add" ? answersAmount : answersAmount - 2

    setFocus(`answers.${indexToFocus}`)
  }

  if (status == "loading") {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    )
  }

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
          <Label htmlFor="answers.0">Answers</Label>
          {Array.from({ length: answersAmount }).map((_, index) => (
            <Input
              key={index}
              id={`answers.${index}`}
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  event.preventDefault()

                  handleEnter(index)
                } else if (event.code == "Backspace") {
                  if (event.currentTarget.value != "") {
                    return
                  }

                  event.preventDefault()

                  handleBackspace(index)
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
