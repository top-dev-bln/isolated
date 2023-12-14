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
  console.log("pula siua");
  /*console.log(baluba);
                    console.log(
                      JSON.stringify({
                        acc_tkn: baluba.provider_token,
                        ref_tkn: baluba.provider_refresh_token,
                      })
                    );*/

  fetch("https://server-upldfy.vercel.app/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      acc_tkn: baluba.access_token,
      ref_tkn: baluba.provider_refresh_token,
    }),
  }).then((response) => {
    response.text().then((text) => {
      console.log(text);
    });
  });
}

function testServer(acc_tkn, ref_tkn) {
  fetch("https://server-upldfy.vercel.app/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      acc_tkn: acc_tkn,
      ref_tkn: ref_tkn,
    }),
  }).then((response) => {
    response.text().then((text) => {
      console.log(text);
    });
  });
}

export { LoginWithGoogle, tokenPOST, testServer };
