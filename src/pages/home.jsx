import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Heading, VStack, Button, Avatar, Center } from "@chakra-ui/react";
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
  const [avatarUrl, setAvatarUrl] = useState("");
  const [token, setToken] = useState("");

  async function checkUserOnStart() {
    await supaClient.auth.onAuthStateChange((event, session) => {
      if (!session) {
        setTimeout(() => {
          navigate("/");
        }, 100);
      }

      if (session) {
        setAvatarUrl(session.user.user_metadata.avatar_url);
        setToken(session.access_token);
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
  
    <Center h="60vh">
      {
        <VStack spacing={8} color="white">
          
          <Heading as="h1" size="2xl" fontWeight="extrabold" color="white">
            Your Pages
          </Heading>
          <PageList token={token} />
          <Link to="/create">
            <Button colorScheme="blue">Create New Page</Button>
          </Link>
        </VStack>
      }
      </Center>
      <Footer />
      
  </div>
);


}

export default App;
