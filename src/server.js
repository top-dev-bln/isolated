import { createClient } from "@supabase/supabase-js";
const supaClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

async function authAsync() {
  return await supaClient.auth.signInWithOAuth({
    provider: "google",
  });
}

export { authAsync };
