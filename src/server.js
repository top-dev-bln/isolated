const supaUrl = import.meta.env.VITE_SUPABASE_URL;
const supaAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

import { createClient } from "@supabase/supabase-js";
const supaClient = createClient(supaUrl, supaAnonKey);

async function authAsync() {
  return await supaClient.auth.signInWithOAuth({
    provider: "google",
    options: { scopes: ["https://www.googleapis.com/auth/drive"] },
  });
}

export { authAsync };
