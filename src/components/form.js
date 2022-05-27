import React, { useState } from "react";
import { api } from "../utils/api";

export const Form = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const styles = {
    modalBackdrop: {
      display: props.isHidden ? "none" : "block",
      position: "absolute",
      background: "black",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      opacity: "0.8",
      zIndex: 999,
      width: "100vw",
      height: "100vh",
    },
    modal: {
      position: "absolute",
      top: "30%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 9999,
    },
  };

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setBody(e.target.value);
    }
  };

  const closeModal = () => {
    setBody("");
    setTitle("");
    props.setIsHidden(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogPost = {
      title,
      body,
      userId: crypto.randomUUID(),
    };
    try {
      const res = await api.createBlog(blogPost);
      const blog = await res.json();
      blog.id = crypto.randomUUID(); // only need this line to stop key clashes
      // Adding new blog to top of the rendered list in blogs component
      props.setBlogs([blog, ...props.blogList]);
    } catch (err) {
      console.log(err);
    }
    closeModal();
  };

  return (
    <>
      <div style={styles.modalBackdrop}></div>
      <div style={{ display: props.isHidden ? "none" : "block" }}>
        <div className="modal-dialog" style={styles.modal}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Blog</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="form-label" htmlFor="blogTitle">
                    Title
                  </label>
                  <input
                    id="blogTitle"
                    className="form-control"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={title}
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="blogBody">
                    Body
                  </label>
                  <textarea
                    id="blogBody"
                    className="form-control"
                    type="text"
                    name="body"
                    onChange={handleChange}
                    value={body}
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
