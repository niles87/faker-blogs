import { useState } from "react";
import "./App.css";
import { Blogs } from "./components/blogs";
import { Form } from "./components/form";

function App() {
  const [hidden, setHidden] = useState(true);
  const openModal = () => setHidden(false);
  return (
    <div className="container">
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Blogs</h1>
        <button onClick={openModal} className="btn btn-primary">
          New Blog
        </button>
      </header>
      <Form isHidden={hidden} setIsHidden={setHidden} />
      <Blogs />
    </div>
  );
}

export default App;
