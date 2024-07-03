import { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("No title");

  return (
    <>
      <h1>{title}</h1>
      <button onClick={() => setTitle("Hello")}>Click me</button>
    </>
  );
}

export default App;
