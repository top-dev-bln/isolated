import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


// make the consent  screen with scopes to get access to google drive
function LoginWithGoogle(){
  const supaClient = createClient(supabaseUrl, supabaseAnonKey);
  supaClient.auth.signIn({
    provider: "google",
    scopes: "https://www.googleapis.com/auth/drive.file",
  });
}

async function authAsync() {
  const supaClient = createClient(supabaseUrl, supabaseAnonKey);
  return await supaClient.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: "https://server-upldfy.vercel.app/griveRedirect" },
  });
}

export { authAsync , LoginWithGoogle};
