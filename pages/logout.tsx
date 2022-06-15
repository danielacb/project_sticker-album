import { useRouter } from "next/router";
import { useEffect } from "react";
import { supabase } from "../lib/initSupabase";

export default function Logout() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    logout();
    router.push("/login");
  }, []);

  return <h1>Saindo...</h1>;
}
