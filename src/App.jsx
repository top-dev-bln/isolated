import "./App.css";
import { LoginWithGoogle } from "./server.js";
import { useEffect } from "react";

//codetotoken but also send the google id thingy so i can store the code in users db
//then i can use the code to get the token and then use the token to get the user id
function codeToToken(code) {
  console.log(code);
}

function App() {
  useEffect(() => {
    const url = new URL(window.location);
    const code = url.searchParams.get("code");
    if (code) {
      codeToToken(code);
    }
  }, []);

  //store token in local storage
  //redirect to home page
  //if no code, show login button

  return (
    <div className="App">
      <header>
        <h1> suck </h1>{" "}
        <div className="centered-container">
          <button onClick={() => LoginWithGoogle()}>
            {" "}
            Sign In with Google{" "}
          </button>{" "}
        </div>{" "}
      </header>{" "}
    </div>
  );
}

export default App;
