import { LoginWithGoogle } from "../server.js";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import logo from "../assets/bruv.svg";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supaClient = createClient(supabaseUrl, supabaseAnonKey);

export default function Navbar() {
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

  function scrollToAbout() {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
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
            <button className="nav-btn" onClick={scrollToAbout}>About</button>
          </li>
          <li className='p-4'>
            <div>
              {isAuthenticated ? (
                <button className="nav-btn" onClick={() => navigate("/my-pages")}>My Pages</button>
              ) : (
                <div>
                  <button className="nav-btn" onClick={() => LoginWithGoogle()}>Sign In with Google</button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}
