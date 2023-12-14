import "./App.css";
import { LoginWithGoogle, tokenPOST } from "./server.js";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supaClient = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  async function checkUserOnStart() {
    await supaClient.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        setAvatarUrl(session.user.user_metadata.avatar_url);
        if (event === "INITIAL_SESSION") {
          console.log(session);
          tokenPOST(session.provider_refresh_token, session.user.id);
        }
      }
    });
  }

  useEffect(() => {
    checkUserOnStart();
  }, []);

  return (
    <div className="App">
      <header>
        <h1> suck </h1>{" "}
        <div className="centered-container">
          {" "}
          {isAuthenticated ? (
            <div className="centered-content">
              <img src={avatarUrl} alt="User Avatar" />
              <button onClick={() => supaClient.auth.signOut()}>
                Sign Out{" "}
              </button>{" "}
            </div>
          ) : (
            <div>
              <button onClick={() => LoginWithGoogle()}>
                {" "}
                Sign In with Google{" "}
              </button>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </header>{" "}
    </div>
  );
}

export default App;
