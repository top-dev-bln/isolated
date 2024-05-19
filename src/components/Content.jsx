import { ReactTyped } from 'react-typed';
import { LoginWithGoogle } from "../server.js";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supaClient = createClient(supabaseUrl, supabaseAnonKey);

export default function Content() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function checkUserOnStart() {
    await supaClient.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }

  useEffect(() => {
    checkUserOnStart();
  }, []);

  return (
    <div className='text-white h-screen flex flex-col justify-center items-center'>
      <p className='text-[#258EA6] font-bold p-2'>
        FILE SHARING DIRECTLY IN YOUR BROWSER.
      </p>
      <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
        Get your data.
      </h1>
      <div className='flex justify-center items-center flex-wrap'>
        <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
          Fast, reliable, and secure from
        </p>
        <ReactTyped
          className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
          strings={['potential recruits', 'clients', 'and collaborators']}
          typeSpeed={120}
          backSpeed={140}
          loop
        />
      </div>
      <p className='md:text-2xl text-xl font-bold text-gray-500 break-words'>
        Effortlessly receive all the necessary data by simply sharing a secure link.
      </p>
      
      {isAuthenticated ? (
        <button className='bg-[#258EA6] w-[200px] rounded-md font-medium my-6 py-3 text-white' onClick={() => navigate("/my-pages")}>Get Started Now</button>
      ) : (
        <button className='bg-[#258EA6] w-[200px] rounded-md font-medium my-6 py-3 text-white' onClick={() => LoginWithGoogle()}>Get Started Now</button>
      )}
    </div>
  );
}
