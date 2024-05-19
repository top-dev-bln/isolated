import {


 
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
  <div className="h-screen bg-gradient-to-r from-blue-500 to-teal-500">
  <div className="flex flex-col justify-center items-center h-full w-full p-4">
    <h1 className="text-5xl font-bold text-white mb-10">
      Create Upload Page
    </h1>
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <label className="block text-2xl text-white mb-4">Page title</label>
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Title"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
          className="w-full p-3 rounded-l-lg text-gray-800 focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-r-lg transition-colors duration-300 ${loading ? "cursor-not-allowed" : ""}`}
        >
          {loading ? "Adding..." : "Submit"}
        </button>
      </div>
    </form>
  </div>
</div>
      <Footer/>
    </div>
  );
}
