import { ThemeProvider } from "@emotion/react";
import { Auth } from "@supabase/ui";
import type { AppProps } from "next/app";
import { StickersProvider } from "../context";
import { supabase } from "../lib/initSupabase";
import GlobalStyles from "../styles/global";
import { nationsLeague } from "../styles/nationsLeague";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <StickersProvider>
          <ThemeProvider theme={nationsLeague}>
            <GlobalStyles />
            <Component {...pageProps} />
          </ThemeProvider>
        </StickersProvider>
      </Auth.UserContextProvider>
    </main>
  );
}
