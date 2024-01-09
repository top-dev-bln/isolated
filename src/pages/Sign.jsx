import { LoginWithGoogle } from "../server.js";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supaClient = createClient(supabaseUrl, supabaseAnonKey);
import monkeyImage from "../assets/monk.jpg";
import { useNavigate } from "react-router-dom";

export default function Sign() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function checkUserOnStart() {
    await supaClient.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        setTimeout(() => {
          navigate("/my-pages");
        }, 100);
      }
    });
  }

  useEffect(() => {
    checkUserOnStart();
  }, []);

  return (
    <div className="App">
      <div>
        {" "}
        {isAuthenticated ? (
          <>
            {" "}
            {Math.random() < 0.5 && (
              <img
                src={monkeyImage}
                alt="Monkey"
                style={{
                  objectFit: "cover",
                  width: "100vw",
                  height: "100vh",
                  opacity: "0.69",
                }}
              />
            )}{" "}
          </>
        ) : (
          <div>
            <button onClick={() => LoginWithGoogle()}>
              Sign In with Google{" "}
            </button>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
}
