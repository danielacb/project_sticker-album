import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { Player } from "../../types";

type Props = {
  player?: Player;
  opened?: boolean;
  onClick?: () => void;
};

export default function Sticker({ player, opened, onClick }: Props) {
  return (
    <Wrapper onClick={onClick} opened={opened}>
      {!!onClick && <h3>Abrir figurinha</h3>}

      {opened ? (
        <ImageContainer>
          <Image
            src={player.picture_url}
            alt={player.name}
            layout="intrinsic"
            width={260}
            height={260}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUZPhfDwACywGRU9I6UAAAAABJRU5ErkJggg=="
          />
        </ImageContainer>
      ) : (
        <h3>{player.name}</h3>
      )}
    </Wrapper>
  );
}

type WrapperProps = { opened: boolean };

const Wrapper = styled.div<WrapperProps>`
  ${({ theme, opened }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    max-width: 270px;
    height: 338px;
    border-radius: 16px;
    background: ${opened ? theme.colors.white : theme.colors.primaryDark};
    border: 2px solid ${theme.colors.secondary};
  `}
`;

const ImageContainer = styled.div`
  position: relative;
`;
