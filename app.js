const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRouts");
const compression = require("compression");
const helmet = require("helmet");

// express app
const app = express();

// Add helmet to the middleware chain.
// Set CSP headers to allow our Bootstrap and Jquery to be served
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);

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

app.use(compression()); // Compress all routes
// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.use("/blogs", blogRoutes); // add blog routes
