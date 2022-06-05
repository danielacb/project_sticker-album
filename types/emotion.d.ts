import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      primaryDark: string;
      secondary: string;
      white: string;
    };
    font: {
      family: string;
    };
  }
}
