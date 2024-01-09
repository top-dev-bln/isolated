import "../App.css";
import { LoginWithGoogle, tokenPOST } from "../server.js";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Heading, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import PageList from "../components/PageList.jsx";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supaClient = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const [token, setToken] = useState("");

  async function checkUserOnStart() {
    await supaClient.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (!session) {
        setTimeout(() => {
          navigate("/signup");
        }, 100);
      }

      if (session) {
        setAvatarUrl(session.user.user_metadata.avatar_url);

        setToken(session.access_token);
        if (
          event === "INITIAL_SESSION" // &&
          //session.provider_refresh_token !== undefined
        ) {
          console.log("call");
          tokenPOST(
            session.user.id,
            session.access_token,
            session.provider_refresh_token
          );
        }
      }
    });
  }

  useEffect(() => {
    console.log("canellaeffect");
    checkUserOnStart();
  }, []);

  return (
    <div className="App">
      <div>
        {" "}
        {isAuthenticated ? (
          <div>
            <div className="header-container">
              <button
                className="sign-out-button"
                onClick={() => supaClient.auth.signOut()}
              >
                <img className="avatar" src={avatarUrl} alt="User Avatar" />
                Sign Out{" "}
              </button>{" "}
            </div>{" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
              }}
            >
              <VStack p={4}>
                <Heading
                  mt="20"
                  p="5"
                  fontWeight="extrabold"
                  size="2xl"
                  bgColor={"#000000"}
                  bgClip="text"
                >
                  Suck{" "}
                </Heading>{" "}
                <PageList token={token} />{" "}
                <Link to="/create">
                  <Button w="100%" px={"200px"}>
                    Create{" "}
                  </Button>{" "}
                </Link>{" "}
              </VStack>{" "}
            </div>{" "}
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
    </div>
  );
}

export default App;
