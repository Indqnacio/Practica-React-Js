import Home from "./components/home/home";
import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="principal_card">
        {/*  
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
     */}

        <p>
          Aqui necesitamos hacer la tabla de prime react donde traeremos toda la
          informacion de los personajes de star wars usando su API
        </p>
        <Home />
      </div>
    </>
  );
}

export default App;
