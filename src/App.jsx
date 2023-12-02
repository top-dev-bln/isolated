import "./App.css";
import { authAsync } from "./server.js";

async function authInit() {
  await authAsync();
  const url = new URL(window.location);
  const code = url.searchParams.get("code");
  console.log(code);
}

function App() {
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
