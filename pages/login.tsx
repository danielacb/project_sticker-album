import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { useStickers } from "../context";
import { supabase } from "../lib/initSupabase";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface ProjectFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Login() {
  const [authView, setAuthView] = useState("sign_in");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { setUser } = useStickers();

  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json());
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    setIsLoading(true);
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    setError(error?.message);

    if (user && !error) {
      await setUser({
        id: user.id,
        email: user.email,
      });

      router.push("/");
    }

    setIsLoading(false);
  };

  const signUp = async () => {
    setIsLoading(true);
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setError(error?.message);
    setIsLoading(false);

    if (user && !error) router.push("/");
  };

  const handleSubmit = (e: FormEvent<ProjectFormElements>) => {
    e.preventDefault();

    authView === "sign_in" && signIn();
    authView === "sign_up" && signUp();
  };

  return (
    <Wrapper>
      <Tab
        active={authView === "sign_in"}
        onClick={() => setAuthView("sign_in")}
      >
        <h3>Login</h3>
      </Tab>
      <Tab
        active={authView === "sign_up"}
        onClick={() => setAuthView("sign_up")}
      >
        <h3>Cadastrar</h3>
      </Tab>

      <Form onSubmit={handleSubmit}>
        <TextField
          type="email"
          name="email"
          label="E-mail"
          placeholder="E-mail"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.currentTarget.value)
          }
        />
        <TextField
          type="password"
          name="password"
          label="Senha"
          placeholder="Senha"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }
        />
        <Button type="submit" fullWidth>
          {isLoading ? "loading" : "Entrar"}
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Wrapper>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return { props: {}, redirect: { destination: "/", permanent: false } };
  }

  return { props: {} };
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 96px auto;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 6px;
`;

const Form = styled.form`
  padding: 32px;
`;

const Tab = styled.button<{ active }>`
  ${({ theme, active }) => css`
    display: inline-block;
    width: 50%;
    padding: 16px;
    text-align: center;
    border: none;
    cursor: pointer;
    background-color: ${active
      ? theme.colors.secondary
      : theme.colors.primaryDark};

    &:first-of-type {
      border-top-left-radius: 6px;
    }
    &:nth-of-type(2) {
      border-top-right-radius: 6px;
    }
  `}
`;

const ErrorMessage = styled.div`
  ${({ theme }) => css`
    width: 100%;
    color: ${theme.colors.white};
    margin-top: 32px;
  `}
`;
