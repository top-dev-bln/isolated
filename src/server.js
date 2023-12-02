import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
    const supabaseAnonKey =

        async function authAsync() {
            const supaClient = createClient(supabaseUrl, supabaseAnonKey);
            return await supaClient.auth.signInWithOAuth({
                provider: "google",
            });
        }

export { authAsync };