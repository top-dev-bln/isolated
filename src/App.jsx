import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Create from "./pages/Create.jsx";
import NotFound from "./pages/404.jsx";
import Upload from "./pages/Upload.jsx";
import Dash from "./pages/Dash.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/p/:id" element={<Upload />} />

        <Route path="/:id" element={<Dash />} />

        <Route path="/404" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
