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
        //todo scos consent
        prompt: "consent",
      },
      redirectTo: "https://isolated.vercel.app/my-pages",
    },
  });
}

function page_info(id) {
  return fetch(`http://localhost:5000/page-info/${id}`, {
    method: "GET",
  });
}

async function fetch_pages(jwt) {
  return fetch("http://localhost:5000/my-pages", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
}

function tokenPOST(id, jwt, token) {
  fetch(`http://localhost:5000/token/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      ref_tkn: token,
    }),
  });
}

async function create_page(jwt, name) {
  return fetch("http://localhost:5000/create-page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      name: name,
    }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
}

async function upload_file(id, formData) {
  return fetch(`http://localhost:5000/upload/${id}`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
}

export {
  LoginWithGoogle,
  tokenPOST,
  create_page,
  upload_file,
  page_info,
  fetch_pages,
};
