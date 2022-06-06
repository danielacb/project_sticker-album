import type { NextPage } from "next";
import MainNav from "../components/MainNav";
import { supabase } from "../lib/initSupabase";
import HomePage from "../views/home";

type Prop = {
  user: {
    id: string;
    email: string;
  };
};

const Home: NextPage = ({ user }: Prop) => {
  console.log(user);

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
  const userInfo = {
    id: user.id,
    email: user.email,
  };

  if (!user) {
    return { props: {}, redirect: { destination: "/login", permanent: false } };
  }

  return { props: { user: userInfo } };
}
