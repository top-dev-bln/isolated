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
    },
  });
}

function tokenPOST(baluba) {
  //console.log("ma bag la creatie cu codul " + code);
  console.log("ma bag la creatie");
  console.log(baluba);
  console.log("baluba provders");
  console.log(
    JSON.stringify({
      code1: baluba.provider_token,
      code2: baluba.provider_refresh_token,
      code3: baluba.access_token,
      code4: baluba.refresh_token,
    })
  );

  fetch("https://server-upldfy.vercel.app/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code1: baluba.provider_token,
      code2: baluba.provider_refresh_token,
      code3: baluba.access_token,
      code4: baluba.refresh_token,
    }),
    mode: "no-cors",
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export { LoginWithGoogle, tokenPOST };
