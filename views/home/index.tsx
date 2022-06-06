import styled from "@emotion/styled";
import Container, { StickersContainer } from "../../components/Container";
import Sticker from "../../components/Sticker";

export default function HomePage() {
  return (
    <Wrapper>
      <Container>
        <h1>Home</h1>
        <StickersContainer>
          <Sticker type="new" />
          <Sticker type="empty" />
          <Sticker type="new" />
        </StickersContainer>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 40px 0;

  h1 {
    margin-bottom: 40px;
  }
`;
