import "../App.css";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { tokenPOST } from "../server.js";
import { VStack, Button, Avatar, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/bruv.svg";
import Footer from "../components/Footer.jsx";
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
  }

  useEffect(() => {
    checkUserOnStart();
  }, []);

  return (
    <div className="App">
      <nav className="bg-gray-800 rounded-lg p-4">
        
        <div className='flex justify-between items-center text-white'>
          <a className="flex items-center text-3xl font-bold text-white" href="/my-pages">
            <img className='w-7 h-7 mr-3' src={logo} alt="logo" />Uploadify
          </a>
          <ul className="flex">
            <li className='p-4'>
              <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
            </li>
            
            <li className='p-4'>
            <button 
                onClick={() => supaClient.auth.signOut()} 
                className="flex items-center rounded-lg"
              >
                <Avatar className ="rounded-full" src={avatarUrl} name="User Avatar" boxSize="40px"  />
                <p className="ml-2 text-white">Sign Out</p>
              </button>
            </li>
          </ul>
        </div>
              
            
        </nav>
      <div>
        {isAuthenticated ? (
          <Center h="60vh">
      
        <VStack spacing={8} color="white">
          
          <h1  className="text-7xl font-bold mb-[100px]">My Pages</h1>
          <PageList token={token} />
          <Link to="/create">
            <Button colorScheme="blue">Create New Page</Button>
          </Link>
        </VStack>
      
      </Center>
          
          
        ) : (
          <Center h="60vh">
            <VStack spacing={8} color="white">
              <h1 className="text-7xl font-bold mb-[100px]">Welcome to Uploadify</h1>
              <Link to="/login">
                <Button colorScheme="blue">Sign In</Button>
              </Link>
            </VStack>
          </Center>
        )}
  
    
      <Footer />
      </div>
    </div>
  );
}

export default App;
