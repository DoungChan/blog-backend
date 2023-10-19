const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
// express app
const app = express();

// register view engine
app.set("view engine", "ejs");

// listen for requests
app.listen(3000);

//connect to mongodb
const uri =
  "mongodb+srv://sroeundoungchan19:Doung112233@cluster0.sqi1zx1.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err + " error"));

// add blog
app.post("/blogs", (req, res) => {
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
});

//update blog
app.put("/blogs/:id", (req, res) => {
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
});

// get all blogs
app.get("/blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
// get a single blog
app.get("/blogs/:id", (req, res) => {
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
});

// delete a blog
app.delete(`/blogs/:id`, (req, res) => {
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
});

// middleware
app.use(morgan("dev"));
