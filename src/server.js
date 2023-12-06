import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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

function codeToToken(code, userID) {
  console.log("code to token");
  console.log("ma bag la creatie cu codul " + code + " si userID " + userID);
  console.log(JSON.stringify({ code, userID }));
  fetch("https://server-upldfy.vercel.app/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, userID }),
    mode: "no-cors",
  })
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
    });
}

export { LoginWithGoogle, codeToToken };
