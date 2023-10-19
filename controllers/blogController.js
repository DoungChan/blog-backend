const Blog = require("../models/blog");

// get_allBlogs , get_singleBlog, post_createBlog, update_Blog , blog_delete

const get_allBlogs = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred while getting blogs" });
    });
};

const get_singleBlog = (req, res) => {
  const id = req.params.id; // Extract the "id" parameter from the URL

  Blog.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the blog" });
    });
};
const post_createBlog = (req, res) => {
  const { title, snippet, body } = req.body;

  if (!title || !snippet || !body) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const blog = new Blog({
    title,
    snippet,
    body,
  });

  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while saving the blog post" });
    });
};
const update_Blog = (req, res) => {
  const { title, snippet, body } = req.body;

  if (!title || !snippet || !body) {
    return res.status(400).json({ error: "All fields are required" });
  }

  Blog.findByIdAndUpdate(
    req.params.id,
    {
      title,
      snippet,
      body,
    },
    { new: true }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while saving the blog post" });
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res
        .status(200)
        .json({ message: "Blog deleted successfully", deletedBlog: result });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the blog" });
    });
};

module.exports = {
  get_allBlogs,
  get_singleBlog,
  post_createBlog,
  update_Blog,
  blog_delete,
};
