import Home from "./pages/home/home.jsx";
import Characters from "./pages/characters/characters.jsx";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import SideNav from "./components/sidenav/sidenav.jsx";

function App() {
  return (
    <>
      <SideNav />
      <div className="nav_div">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
