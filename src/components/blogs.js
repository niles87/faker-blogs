import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import { BlogCard } from "./blogcard";

export const Blogs = (props) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      try {
        const res = await api.getBlogs();
        const blogs = await res.json();
        setBlogs(blogs.slice(0, 10));
      } catch (err) {
        console.error(err);
      }
    }

    getBlogs();
  }, []);

  return (
    <div>
      {blogs.length ? (
        blogs.map((blog) => (
          <BlogCard key={blog.id} title={blog.title} body={blog.body} />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
