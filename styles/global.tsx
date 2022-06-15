import { css, Global } from "@emotion/react";
import { nationsLeague as theme } from "./nationsLeague";

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background-color: ${theme.colors.primary};
          font-family: ${theme.font.family};
        }

        body,
        input,
        textarea,
        button {
          color: ${theme.colors.white};
        }

        a {
          text-decoration: none;
        }
      `}
    />
  );
};

export default GlobalStyles;
