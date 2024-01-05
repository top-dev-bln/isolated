import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Create from "./pages/Create.jsx";
import NotFound from "./pages/404.jsx";
import Upload from "./pages/Upload.jsx";
import Dash from "./pages/Dash.jsx";
import Landing from "./pages/LandingPage.jsx";
import Sign from "./pages/Sign.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Sign />} />
          <Route path="/my-pages" element={<Home />} />
          <Route path="/my-pages/:id" element={<Dash />} />
          <Route path="/create" element={<Create />} />
          <Route path="/p/:id" element={<Upload />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
