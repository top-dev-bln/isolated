import "../App.css";
import { LoginWithGoogle, tokenPOST } from "../server.js";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Heading, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import TaskList from "../components/TaskList.jsx";

//import FormCreate from "./components/form.jsx";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supaClient = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  /*const [showForm, setShowForm] = useState(false);
      const [inputValues, setInputValues] = useState({
        input1: "",
        input2: "",
        input3: "",
      });*/

  /* cod pentru form nu mai trebe
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
      */

  // const [id, setId] = useState("");
  const [token, setToken] = useState("");

  /* const handleFormSubmit = (values) => {
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
 */

  async function checkUserOnStart() {
    console.log("ce sa mai verif ca sunt verificat");
    await supaClient.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);

      if (session) {
        setAvatarUrl(session.user.user_metadata.avatar_url);

        // getPages(session.access_token);

        // setId(session.user.id);
        setToken(session.access_token);
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
      <div>
        {" "}
        {isAuthenticated ? (
          <div>
            <div className="header-container">
              <button
                className="sign-out-button"
                onClick={() => supaClient.auth.signOut()}
              >
                <img className="avatar" src={avatarUrl} alt="User Avatar" />
                Sign Out{" "}
              </button>{" "}
            </div>{" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
              }}
            >
              <VStack p={4}>
                <Heading
                  mt="20"
                  p="5"
                  fontWeight="extrabold"
                  size="2xl"
                  bgColor={"#000000"}
                  bgClip="text"
                >
                  Suck{" "}
                </Heading>{" "}
                <TaskList token={token} />{" "}
                <Link to="/create">
                  <Button w="100%" px={"200px"}>
                    Create{" "}
                  </Button>{" "}
                </Link>{" "}
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
  );
}

export default App;
