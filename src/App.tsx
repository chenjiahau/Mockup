import { useState } from "react";
import "./App.css";

function App() {
  const [title] = useState("React Mockup");

  return (
    <>
      <div className='container'>
        <h1>{title}</h1>
      </div>
    </>
  );
}

export default App;
