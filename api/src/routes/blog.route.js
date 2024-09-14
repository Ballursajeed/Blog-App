import { Router } from "express";
import { commentingBlog, 
         deleteBlog, 
         getAllBlogs, 
         getAllComments, 
         getBlogLikes, 
         getMyBlogs, 
         getSingleBlog, 
         likingBlog, 
         postBlog, 
         updateBlog } from "../controllers/blog.controller.js";
import { validateUser } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/getAllBlogs").get(validateUser,getAllBlogs)
router.route("/getSingleBlog/:id").get(validateUser,getSingleBlog)
router.route("/getBlogLikes/:id").get(validateUser,getBlogLikes)
router.route("/getBlogComments/:id").get(validateUser,getAllComments)
router.route("/getMyBlogs").get(validateUser,getMyBlogs)

router.route("/post").post(validateUser,postBlog)
router.route("/like/:id").post(validateUser,likingBlog)
router.route("/comment/:id").post(validateUser,commentingBlog)

router.route("/updateBlog/:id").put(validateUser,updateBlog)
router.route("/deleteBlog/:id").delete(validateUser,deleteBlog)


export default router;