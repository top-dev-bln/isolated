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
import { VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import UploadList from "../components/UploadList.jsx";
import Footer from "../components/Footer.jsx";
import logo from "../assets/bruv.svg";

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
      <div className="h-screen bg-gradient-to-r from-blue-500 to-teal-500">
          {" "}
          <nav className="bg-gray-800 rounded-lg p-4">
        
        <div className='flex justify-between items-center text-white'>
          <a className="flex items-center text-3xl font-bold text-white" href="/my-pages">
            <img className='w-7 h-7 mr-3' src={logo} alt="logo" />Uploadify
          </a>
          <ul className="flex ">
            <li className='p-4'>
              <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
            </li>
            
            <li className='p-4'>
            <button 
                onClick={() => supaClient.auth.signOut()} 
                className="flex items-center rounded-lg nav-btn"
              >
                <img className ="rounded-full flex items-center object-scale-down h-6" src={avatarUrl} name="User Avatar" />
                <p className="ml-2 text-white">Sign Out</p>
              </button>
            </li>
          </ul>
        </div>
              
            
        </nav>
        {isAuthenticated ? (
          <div>
            <div className="header-container">
              
            </div>{" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "55vh",
              }}
            >
              <VStack p={4}>
                <h1 className="text-7xl text-white p-5 font-bold mb-4"
                  
                >
                  Dash
                </h1>{" "}
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
      <Footer />
      </ChakraProvider>
    
  );
}

export default Dash;
