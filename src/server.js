import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function authAsync() {
  const supaClient = createClient(supabaseUrl, supabaseAnonKey);
  return await supaClient.auth.signInWithOAuth({
    provider: "google",
    settings: {
      scopes: "https://www.googleapis.com/auth/drive",
    },
  });
}

export { authAsync };
