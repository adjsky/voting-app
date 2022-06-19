import styled from "styled-components"

export const Container = styled.main`
  min-height: 100vh;
  width: 100%;
  padding: 10vh 0;
`

export const LoadingContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Form = styled.form`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`

export const Title = styled.h1`
  color: var(--white);
  font-size: 2rem;
  font-weight: 300;
`

export const Block = styled.div`
  margin-top: 2rem;
`

export const Label = styled.label`
  color: var(--gray);
  font-size: 1.5rem;
  font-weight: 400;
`

export const Input = styled.input`
  display: flex;
  margin-top: 1rem;
  width: 100%;
  border: none;
  outline: none;
  border-radius: 0.625rem;
  padding: 0.625rem 1rem;
  background: var(--white);
  font-weight: 400;
  font-size: 1.125rem;

  &::placeholder,
  & {
    color: var(--black);
  }
`

export const Submit = styled.button`
  background: var(--pink);
  border-radius: 0.625rem;
  padding: 1rem 1.5rem;
  color: var(--white);
  font-weight: 500;
  font-size: 1.125rem;

  margin-top: 4rem;

  transition: background 0.2s ease-in-out;

  &:hover {
    background: var(--pink-hover);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`

export const Error = styled.p`
  color: var(--red);
  font-weight: 400;
  font-size: 1.125rem;
  margin-top: 0.5rem;
`
