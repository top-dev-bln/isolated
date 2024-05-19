import {
  Button,
  HStack,
  Input,
  Center,
  Text,
  useToast,
  Avatar,
} from "@chakra-ui/react";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { create_page } from "../server.js";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supaClient = createClient(supabaseUrl, supabaseAnonKey);

import logo from "../assets/bruv.svg";

export default function AddTask() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [text, setText] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function checkUserOnStart() {
    await supaClient.auth.onAuthStateChange((event, session) => {
      if (session) {
        setAvatarUrl(session.user.user_metadata.avatar_url);
        setToken(session.access_token);
      }
      if (!session) {
        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    const result = await create_page(token, text);
    setLoading(false);
    setText("");

    toast({
      title: result.create_status === "ok" ? "Page Created!" : "Error",
      position: "top",
      status: result.create_status === "ok" ? "success" : "error",
      duration: 2000,
      isClosable: true,
    });

    if (result.create_status === "ok") {
      navigate(`/my-pages/${result.data[0].id}`);
    }
  }

  useEffect(() => {
    checkUserOnStart();
  }, []);

  return (
    <div>
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
      <Center>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "60vh",
          }}
        >
          <Text
            fontSize="3xl"
            fontWeight="bold"
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
            marginBottom="10"
            color="white"
          >
            Create Upload Page
          </Text>
          <form onSubmit={handleSubmit}>
            <Text fontSize="xl" color="white">Page title</Text>
            <HStack my="4" h="45" className="relative">
              <Input
                h="100%"
                variant="filled"
                placeholder="Title"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={loading}
              />
              <Button
                type="submit"
                isLoading={loading}
                loadingText="Adding"
                color={"white"}
                h="100%"
                className="absolute top-0 right-0"
              >
                Blow Me!{" "}
              </Button>{" "}
            </HStack>{" "}
          </form>
        </div>
      </Center>
      <Footer/>
    </div>
  );
}
