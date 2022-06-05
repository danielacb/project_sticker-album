import type { NextPage } from "next";
import Container from "../components/Container";
import MainNav from "../components/MainNav";

const Home: NextPage = () => {
  return (
    <>
      <MainNav />
      <Container>
        <h1>Home</h1>
      </Container>
    </>
  );
};

export default Home;
