//import .env
//import dotenv from "dotenv";
//dotenv.config();
//const supaAnonKey = process.env.SUPABASE_ANON_KEY;
//const supaUrl = process.env.SUPABASE_URL;

const supaUrl = "https://rovmgxgudxfaxrcuahos.supabase.co";
const supaAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvdm1neGd1ZHhmYXhyY3VhaG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyNzMyNzEsImV4cCI6MjAxNjg0OTI3MX0.B3ATVowsmCJYXc72AEP7ys553PjB-aO0ZoYnAe4ljpM";

import { createClient } from "@supabase/supabase-js";
const supaClient = createClient(supaUrl, supaAnonKey);

//fetch url from gapi.js
fetch("https://server-upldfy.vercel.app/griveAuth")
  .then((res) => res.text())
  .then((text) => {
    const approve = confirm(text);
  });

async function authAsync() {
  return await supaClient.auth.signInWithOAuth({
    provider: "google",
    redirectTo: approve,
  });
}

export { authAsync, supaClient };
