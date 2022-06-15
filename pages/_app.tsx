import { ThemeProvider } from "@emotion/react";
import { Auth } from "@supabase/ui";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { hotjar } from "react-hotjar";
import smartlookClient from "smartlook-client";
import { StickersProvider } from "../context";
import { supabase } from "../lib/initSupabase";
import GlobalStyles from "../styles/global";
import { nationsLeague } from "../styles/nationsLeague";

const hotjarID = process.env.NEXT_PUBLIC_HOTJAR_HJID;
const smartlookKey = process.env.NEXT_PUBLIC_SMARTLOOK_KEY;

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    smartlookClient.init(`${smartlookKey}`);
    hotjar.initialize(Number(hotjarID), 6);
  }, []);

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
