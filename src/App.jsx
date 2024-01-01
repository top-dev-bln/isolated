import "./App.css";
import { LoginWithGoogle, tokenPOST } from "./server.js";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import FormCreate from "./components/form.jsx";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supaClient = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
  });

  // const [id, setId] = useState("");
  //const [token, setToken] = useState("");

  const handleFormSubmit = (values) => {
    // Logic to handle form submission
    console.log("Form submitted");
    console.log("Input 1:", values.input1);
    console.log("Input 2:", values.input2);
    console.log("Input 3:", values.input3);

    // Set showForm to false when form is submitted
    setShowForm(false);
  };

  const handleInputChange = (name, value) => {
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  async function checkUserOnStart() {
    await supaClient.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        setAvatarUrl(session.user.user_metadata.avatar_url);
        // setId(session.user.id);
        //  setToken(session.access_token);
        if (event === "INITIAL_SESSION") {
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
      <header>
        <h1> suck </h1>{" "}
        <div className="centered-container">
          {" "}
          {isAuthenticated ? (
            <div>
              <div className="header-container">
                <button
                  className="sign-out-button"
                  onClick={() => supaClient.auth.signOut()}
                >
                  <img className="avatar" src={avatarUrl} alt="User Avatar" />
                  Sign Out
                </button>
              </div>
              <div className="centered-content">
                {showForm ? (
                  <FormCreate
                    onFormSubmit={handleFormSubmit}
                    onInputChange={handleInputChange}
                  />
                ) : (
                  <button onClick={() => setShowForm(true)}>
                    Create a new form
                  </button>
                )}
              </div>
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
      </header>{" "}
    </div>
  );
}

export default App;
