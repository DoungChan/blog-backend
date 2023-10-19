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
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog",
    snippet: "about my new blog",
    body: "more about my new blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

// get all blogs
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
// get a single blog
app.get("/single-blog ", (req, res) => {
  Blog.findById("5f8a8b0f7b7c1d1c9c6a7c4b")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
// delete a blog
app.get("/delete-blog", (req, res) => {
  Blog.findByIdAndDelete("6531029f31b61666ad38feb6")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
// middleware
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});
// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});
//
// 404 page
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
