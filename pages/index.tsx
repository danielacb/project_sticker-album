import type { NextPage } from "next";
import { useEffect } from "react";
import MainNav from "../components/MainNav";
import { useStickers } from "../context";
import { supabase } from "../lib/initSupabase";
import HomePage from "../views/home";

type Prop = {
  user: {
    id: string;
    email: string;
  };
};

const Home: NextPage = ({ user }: Prop) => {
  const { setUser } = useStickers();

  useEffect(() => {
    setUser(user);
  }, []);

  return (
    <>
      <MainNav />
      <HomePage />
    </>
  );
};

export default Home;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/login", permanent: false } };
  }

  const userInfo = {
    id: user.id,
    email: user.email,
  };
  return { props: { user: userInfo } };
}
