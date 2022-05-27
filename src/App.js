import { useEffect, useState } from "react";
import "./App.css";
import { Blogs } from "./components/blogs";
import { Form } from "./components/form";
import { api } from "./utils/api";

function App() {
  const [hidden, setHidden] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      const res = await api.getBlogs();
      const blogPosts = await res.json();
      setBlogs(blogPosts.slice(0, 10));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const openModal = () => setHidden(false);

  return (
    <div className="container">
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Blogs</h1>
        <button onClick={openModal} className="btn btn-primary">
          New Blog
        </button>
      </header>
      <Form
        isHidden={hidden}
        setIsHidden={setHidden}
        blogList={blogs}
        setBlogs={setBlogs}
      />
      <Blogs blogList={blogs} />
    </div>
  );
}

export default App;
