import Home from "./pages/home/home.jsx";
import Characters from "./pages/characters/characters.jsx";
import SideNav from "./components/sidenav.jsx";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <div className="nav_div">
        <SideNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
        </Routes>
      </div>
      <div className="principal_card">Aqui podriamos poner el navbar</div>
    </>
  );
}

export default App;
