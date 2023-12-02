import "./App.css";
import { authAsync } from "./server.js";
import { useEffect } from "react";

async function authInit() {
  await authAsync();
}

function App() {
  useEffect(() => {
    const url = new URL(window.location);
    const code = url.searchParams.get("code");
    if (code) {
      console.log(code);
    }
  }, []);
  return (
    <div className="App">
      <header>
        <h1> suck </h1>{" "}
        <div className="centered-container">
          <button onClick={() => authInit()}> Sign In with Google </button>{" "}
        </div>{" "}
      </header>{" "}
    </div>
  );
}

export default App;
