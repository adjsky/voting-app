import React from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

import {
  Arrow,
  Container,
  Create,
  MadeBy,
  Title,
  SecondaryTitle,
  Paragraph,
  CreditsContainer,
  Start
} from "./styles"

const Home: React.FC = () => {
  return (
    <Container>
      <Create>
        <Title>Voting app</Title>
        <Start href="/create">Start a poll</Start>
        <Arrow href="#madeby">
          <IoIosArrowDown size="1.5em" />
        </Arrow>
      </Create>
      <MadeBy id="madeby">
        <CreditsContainer>
          <SecondaryTitle>Credits</SecondaryTitle>
          <Paragraph>
            Made by <a href="https://github.com/adjsky">adjsky</a>
          </Paragraph>
          <Paragraph>
            Hosted on <a href="https://vercel.com/">Vercel</a>
          </Paragraph>
          <Paragraph>
            Source available on{" "}
            <a href="https://github.com/adjsky/voting-app">Github</a>
          </Paragraph>
        </CreditsContainer>
        <Arrow href="#" black>
          <IoIosArrowUp size="1.5em" />
        </Arrow>
      </MadeBy>
    </Container>
  )
}

export default Home
