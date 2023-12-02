import dotenv from "dotenv";
dotenv.config();
const supaAnonKey = import.meta.env.SUPABASE_ANON_KEY;
const supaUrl = import.meta.env.SUPABASE_URL;

//import { createClient } from "@supabase/supabase-js";
//const supaClient = createClient(supaUrl, supaAnonKey);
console.log(supaUrl);
/*
async function authAsync() {
  return await supaClient.auth.signInWithOAuth({
    provider: "google",
    options: { scope: "https://www.googleapis.com/auth/drive" },
  });
}*/

async function authAsync() {
  console.log("supa");
  console.log(import.meta.env.BAKKA);
}

export { authAsync };
