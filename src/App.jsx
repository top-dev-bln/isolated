import "./App.css";
import { authAsync, LoginWithGoogle } from "./server.js";
import { useEffect } from "react";


function codeToToken(code) {
  fetch("http://server-upldfy.vercel.app/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("token", data.token);
      window.location = "/";
    });
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
          <button onClick={() => LoginWithGoogle()}> Sign In with Google </button>{" "}
        </div>{" "}
      </header>{" "}
    </div>
  );
}

export default App;
