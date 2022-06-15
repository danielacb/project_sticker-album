import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useStickers } from "../../context";
import { Player } from "../../types";
import Button from "../Button";
import Sticker from "../Sticker";

export default function Footer() {
  const [sortedPlayer, setSortedPlayer] = useState<Player>(null);
  const [playerDetailIsOpen, setPlayerDetailIsOpen] = useState(false);

  const { players, collection, updateCollection } = useStickers();

  const random = () => players[Math.floor(Math.random() * players.length)];

  const getRandomPlayer = async () => {
    let newPlayer = random();

    while (collection.includes(newPlayer.id)) {
      newPlayer = random();
    }

    setSortedPlayer(newPlayer);
    setPlayerDetailIsOpen(true);
    updateCollection(newPlayer.id);
  };

  const closePlayerDetail = () => {
    setPlayerDetailIsOpen(false);
    setSortedPlayer(null);
  };

  return (
    <Wrapper className={playerDetailIsOpen ? "open" : "closed"}>
      {playerDetailIsOpen ? (
        <PlayerDetail>
          <Sticker player={sortedPlayer} opened={true} />
          <h3>{sortedPlayer.name}</h3>
          <h5>{sortedPlayer.number}</h5>
          <CloseDetail onClick={() => closePlayerDetail()}>X</CloseDetail>
        </PlayerDetail>
      ) : (
        collection.length < players.length && (
          <Button onClick={() => getRandomPlayer()} variant="secondary">
            Abrir nova figurinha
          </Button>
        )
      )}
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.colors.primaryDark};
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &.open {
      padding: 40px;
      height: auto;
    }

    &.closed {
      height: 120px;
    }
  `}
`;

const PlayerDetail = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const CloseDetail = styled.button`
  ${({ theme }) => css`
    align-self: flex-start;
    background-color: ${theme.colors.white};
    border: none;
    border-radius: 20px;
    padding: 6px;
    color: ${theme.colors.primaryDark};
  `}
`;
