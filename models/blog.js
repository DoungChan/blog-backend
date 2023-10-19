const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create blog schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
//create blog model
const Blog = mongoose.model("Blog", blogSchema);
// export blog model
module.exports = Blog;
