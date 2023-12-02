import "./App.css";
import { authAsync, supaClient, getAuthUrl } from "./server.js";
import { useEffect, useState } from "react";

async function checkUserOnStart() {
  await supaClient.auth.onAuthStateChange((event, session) => {
    console.log(event, session);
  });
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    checkUserOnStart();
  }, []);

  async function checkUserOnStart() {
    await supaClient.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        setAvatarUrl(session.user.user_metadata.avatar_url);
      }
    });
  }
  async function redirectToAuthUrl() {
    const url = await getAuthUrl();
    window.location.href = url;
  }

  return (
    <div className="App">
      <header>
        <h1> suck </h1>{" "}
        <div className="centered-container">
          {" "}
          {isAuthenticated ? (
            <div className="centered-content">
              <img src={avatarUrl} alt="User Avatar" />
              <button onClick={() => supaClient.auth.signOut()}>
                Sign Out{" "}
              </button>{" "}
              <button onClick={() => redirectToAuthUrl}>
                {" "}
                Mount Google Drive{" "}
              </button>{" "}
            </div>
          ) : (
            <button onClick={() => authAsync()}> Sign In with Google </button>
          )}{" "}
        </div>{" "}
      </header>{" "}
    </div>
  );
}

export default App;
