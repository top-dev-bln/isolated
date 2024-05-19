import { useParams } from "react-router-dom";
import "../App.css";
import {
  LoginWithGoogle,
  tokenPOST,
  page_info,
  delete_page,
} from "../server.js";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Heading, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import UploadList from "../components/UploadList.jsx";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supaClient = createClient(supabaseUrl, supabaseAnonKey);
import { ChakraProvider, extendTheme } from "@chakra-ui/react";


const theme = extendTheme({
    colors: {
        brand: {
            night: "#0A0A0A",
            spring: "#5CFF9D",
            mint: "#F0F7EE",
            jet: "#333135"

        },
    },
    styles: {
        global: {
            body: {
                bg: "brand.night",
                color: "brand.mint",
            },
        },
    },
})



function Dash() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [title, setTitle] = useState("");

  const [token, setToken] = useState("");

  async function checkUserOnStart() {
    await supaClient.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (!session) {
        setTimeout(() => {
          navigate("/");
        }, 100);
      }

      if (session) {
        setAvatarUrl(session.user.user_metadata.avatar_url);

        setToken(session.access_token);
        if (
          event === "INITIAL_SESSION" &&
          session.provider_refresh_token !== undefined
        ) {
          tokenPOST(
            session.user.id,
            session.access_token,
            session.provider_refresh_token
          );
        }
      }
    });

    const response = await page_info(id);
    const data = await response.json();
    setTitle(data.name);
  }

  useEffect(() => {
    checkUserOnStart();
  }, []);

  const textToCopy = window.location.origin + "/p/" + id;
  const [buttonText, setButtonText] = useState("Copy");

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setButtonText("Copied!");
      setTimeout(() => {
        setButtonText("Copy");
      }, 2000);
    } catch (err) {
      console.error("Copy to clipboard failed:", err);
    }
  };

  const handleDeleteRequest = async () => {
    await delete_page(id, token);
    navigate("/my-pages");
  };

  return (
    <ChakraProvider theme = { theme } >

    
    <div>
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
                  Dash
                </Heading>{" "}
                <p>{title}</p>
                <UploadList token={token} id={id} />{" "}
                <div className="dash-btns">
                  <Button className="dash-btn" onClick={handleDeleteRequest}>
                    Delete{" "}
                  </Button>{" "}
                  <Button className="dash-btn" onClick={handleCopyClick}>
                    {buttonText}
                  </Button>
                </div>
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
      </ChakraProvider>
    
  );
}

export default Dash;
