import styled, { keyframes } from "styled-components"

const fade = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const Container = styled.main``

export const Block = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
`

export const Create = styled(Block)`
  background: #18181b;
  gap: 2rem;
`

export const MadeBy = styled(Block)`
  background: #d1d5db;
  color: #374151;
`

export const CreditsContainer = styled.div``

export const SecondaryTitle = styled.h2`
  font-weight: 700;
  font-size: 1.25rem;

  animation: ${fade} 0.8s ease-in-out;
`

export const Paragraph = styled.p`
  font-weight: 400;
  font-size: 1.125rem;

  animation: ${fade} 0.8s ease-in-out;

  a {
    color: #1e40af;
  }
`

export const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--white);
  font-weight: 300;

  animation: ${fade} 0.8s ease-in-out;
`

type ArrowProps = {
  black?: boolean
}

export const Arrow = styled.a<ArrowProps>`
  display: flex;
  color: ${(props) => (props.black ? "var(--background)" : "var(--white)")};
  position: absolute;
  bottom: 2em;
  left: 50%;
  transform: translateX(-50%);

  animation: ${fade} 0.8s ease-in-out;
`

export const Start = styled.a`
  background: var(--pink);
  border-radius: 0.625rem;
  padding: 0.75rem 1.5rem;
  color: var(--white);
  font-weight: 500;
  font-size: 1.125rem;

  animation: ${fade} 0.8s ease-in-out;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: var(--pink-hover);
  }
`
