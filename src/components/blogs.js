import React from "react";
import { BlogCard } from "./blogcard";

export const Blogs = (props) => {
  return (
    <div>
      {/* conditional rendering check if there are any blogs then render the results*/}
      {props.blogList?.length ? (
        props.blogList.map((blog) => (
          <BlogCard key={blog.id} title={blog.title} body={blog.body} />
        ))
      ) : (
        // here is where you can add a skeleton animation when waiting for data to load.
        <div>Loading...</div>
      )}
    </div>
  );
};
