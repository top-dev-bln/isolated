import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
    import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY;

function LoginWithGoogle() {
    const supaClient = createClient(supabaseUrl, supabaseAnonKey);
    supaClient.auth.signInWithOAuth({
        provider: "google",
        options: {
            scopes: ["https://www.googleapis.com/auth/drive"],
            queryParams: {
                access_type: "offline",
                //prompt: "consent",
            },
            redirectTo: "http://192.168.0.102:3000/my-pages",
        },
    });
}

function page_info(id) {
    return fetch(`https://server-upldfy.vercel.app/page-info/${id}`, {
        method: "GET",

    });
}

async function fetch_pages(jwt) {
    return fetch("https://server-upldfy.vercel.app/my-pages", {
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

async function fetch_uploads(jwt, id) {
    return fetch(`https://server-upldfy.vercel.app/my-uploads/${id}`, {
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
    fetch(`https://server-upldfy.vercel.app/tk/${id}`, {
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
    return fetch("https://server-upldfy.vercel.app/create-page", {
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

async function delete_page(id, jwt) {
    return fetch(`https://server-upldfy.vercel.app/delete-page/${id}`, {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            console.error(error);
        });
}

async function upload_file(id, formData) {
    return fetch(`https://server-upldfy.vercel.app/upload/${id}`, {
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
    fetch_uploads,
    delete_page,
};