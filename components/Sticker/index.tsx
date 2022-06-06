import { css } from "@emotion/react";
import styled from "@emotion/styled";

type Props = {
  type: "empty" | "new";
};

export default function Sticker({ type }: Props) {
  return (
    <Wrapper className={`${type}`}>
      {type === "new" && <h3>Abrir figurinha</h3>}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  ${({ theme, type }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    max-width: 270px;
    height: 338px;
    border-radius: 16px;

    &.new {
      background-color: ${theme.colors.secondary};
      border: 2px solid transparent;
      position: relative;
      z-index: 1;

      &::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background: url("/logo-vnl.png") repeat;
        background-size: 42px 28px;
        opacity: 0.7;
        z-index: -1;
      }
    }

    &.empty {
      background-color: ${theme.colors.primaryDark};
      border: 2px solid ${theme.colors.secondary};
    }
  `}
`;
