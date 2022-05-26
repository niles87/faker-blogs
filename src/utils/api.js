export const api = {
  getBlogs: async function () {
    return fetch("https://jsonplaceholder.typicode.com/posts");
    // return await res.json();
  },
  createBlog: async function (blog) {
    return fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(blog),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  },
};
