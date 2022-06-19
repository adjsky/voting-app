import styled, { keyframes } from "styled-components"

const pulse = keyframes`
  from {
    width: 10%;
    height: 10%;
    opacity: 1;
  }

  to {
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
`

const fade = keyframes`
  from {
    opacity: 0.7;
    width: 90%;
    height: 90%;
  }

  to {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`

const Loader = styled.div`
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

export default Loader
