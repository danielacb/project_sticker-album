import { supabase } from "../../lib/initSupabase";

const handler = async (req, res) => {
  await supabase.auth.api.setAuthCookie(req, res);
};

export default handler;
