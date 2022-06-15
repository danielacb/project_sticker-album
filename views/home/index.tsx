import styled from "@emotion/styled";
import Container, { StickersContainer } from "../../components/Container";
import Footer from "../../components/Footer";
import Sticker from "../../components/Sticker";
import { useStickers } from "../../context";

export default function HomePage() {
  const { players, collection, isLoading } = useStickers();

  return (
    <Wrapper>
      <Container>
        <h1>Home</h1>
        {isLoading ? (
          <h2>loading</h2>
        ) : (
          <StickersContainer>
            {players &&
              players.map((player) => (
                <Sticker
                  key={player.id}
                  player={player}
                  opened={collection?.includes(player.id) || false}
                />
              ))}
            {collection.length <= players.length && <Footer />}
          </StickersContainer>
        )}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 40px 0 400px;

  h1 {
    margin-bottom: 40px;
  }
`;
