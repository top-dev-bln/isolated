import sharing from '../assets/share.png';

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
    <div  id="about-section" className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img 
          className='w-[500px] mx-auto my-4 rounded-xl shadow-lg' 
          src={sharing} 
          alt='/' 
          style={{ borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} 
        />
        <div className='flex flex-col justify-center'>
          <p className='text-[#258EA6] font-bold '>UPLOADIFY DATA SHARING</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Receive Data</h1>
          <p>
            Uploadify is a data sharing service that allows you to easily receive files by simply sharing a link. It provides a centralized platform to view and analyze all the data uploaded by potential recruits, clients, and collaborators. Streamline your workflow and ensure secure, efficient communication and file management with Uploadify.
                  </p>
    {isAuthenticated ? (
        <button className='bg-black text-white w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3' onClick={() => navigate("/my-pages")}>Get Started</button>
      ) : (
        <button className='bg-black text-white w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3' onClick={() => LoginWithGoogle()}>Get Started</button>
      )}
        
        </div>
      </div>
    </div>
  );
}


