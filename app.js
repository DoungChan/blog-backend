const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRouts");

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

// middleware
app.use(express.json());
// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.use("/blogs", blogRoutes);
