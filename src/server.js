import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// make the consent  screen with scopes to get access to google drive
// do not use my server for this use scopes in supabase

function LoginWithGoogle() {
  const supaClient = createClient(supabaseUrl, supabaseAnonKey);
  supaClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      scopes: ["https://www.googleapis.com/auth/drive"],
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: "https://server-upldfy.vercel.app/griveRedirect",
    },
  });
}

function checkLoggedIn() {
  const supaClient = createClient(supabaseUrl, supabaseAnonKey);
  const user = supaClient.auth.user();
  if (user) {
    return true;
  }
  return false;
}

function codeToToken(code) {
  fetch("https://server-upldfy.vercel.app/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: code }),
  }).then((res) => {
    console.log(res);
  });
}

export { LoginWithGoogle, codeToToken, checkLoggedIn };
