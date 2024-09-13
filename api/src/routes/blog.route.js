import { Router } from "express";
import { deleteBlog, getAllBlogs, getSingleBlog, postBlog, updateBlog } from "../controllers/blog.controller.js";
import { validateUser } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/post").post(validateUser,postBlog)
router.route("/getAllBlogs").get(validateUser,getAllBlogs)
router.route("/getSingleBlog/:id").get(validateUser,getSingleBlog)
router.route("/updateBlog/:id").put(validateUser,updateBlog)
router.route("/deleteBlog/:id").delete(validateUser,deleteBlog)

export default router;