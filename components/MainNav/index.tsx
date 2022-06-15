import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Container from "../Container";

export default function MainNav() {
  return (
    <Wrapper>
      <Container>
        <a href="/">
          <img
            src="/logo-vnl.png"
            alt="Logo VNL - Volleyball Nations League"
            width={65}
          />
        </a>
        <Logout href="/logout">sair</Logout>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  ${({ theme }) => css`
    width: 100%;
    padding: 12px 24px;
    background-color: ${theme.colors.primaryDark};

    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `}
`;

const Logout = styled.a`
  color: ${({ theme }) => theme.colors.white};
`;
