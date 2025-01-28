// import { useState } from "react";
import Home from "../src/pages/Home";
import NoticesManager from "./pages/Fetch";
// import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img
            src="https://portal.uovt.ac.lk/front-assets/images/logo/UoVT-icon.png"
            className="logo"
            alt="Vite logo"
          />
        </a>
      </div>
      <h1>UoVT Notice Board</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      <div>
        <NoticesManager />
      </div>
    </>
  );
}

export default App;
