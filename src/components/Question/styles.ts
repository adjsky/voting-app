import styled, { keyframes } from "styled-components"

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--white);
`

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 300;
`

export const Select = styled.button``

export const Vote = styled.button``

const pulse = keyframes`
  from {
    width: 20%;
    height: 20%;
    opacity: 1;
  }

  to {
    width: 95%;
    height: 95%;
    opacity: 0.5;
  }
`

const fade = keyframes`
  from {
    opacity: 0.7;
    width: 85%;
    height: 85%;
  }

  to {
    width: 100%;
    height: 100%;
    opacity: 0.1;
  }
`

export const Loader = styled.div`
  width: 60px;
  height: 60px;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    border-radius: 50%;
    border: 3px solid #fff;
  }

  &::before {
    border-color: gray;

    animation: ${fade} 1.5s ease-out infinite;
  }

  &::after {
    animation: ${pulse} 1.5s ease-out infinite;
  }
`
