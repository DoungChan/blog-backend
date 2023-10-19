const express = require("express");
const {
  get_allBlogs,
  get_singleBlog,
  post_createBlog,
  update_Blog,
  blog_delete,
} = require("../controllers/blogController");
const router = express.Router();

// add blog
router.post("/", post_createBlog);
//update blog
router.put("/:id", update_Blog);
// get all blogs
router.get("/", get_allBlogs);
// get a single blog
router.get("/:id", get_singleBlog);
// delete a blog
router.delete(`/:id`, blog_delete);

module.exports = router;
