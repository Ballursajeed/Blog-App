import { Router } from "express";
import { checkUserLikedBlog, 
         commentingBlog, 
         deleteBlog, 
         deleteComment, 
         getAllBlogs, 
         getAllComments, 
         getBlogLikes, 
         getMyBlogs, 
         getSingleBlog, 
         likingBlog, 
         postBlog, 
         updateBlog, 
         updateBlogImage} from "../controllers/blog.controller.js";
import { validateUser } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middlerware.js";

const router = Router()

router.route("/getAllBlogs").get(validateUser,getAllBlogs)
router.route("/getSingleBlog/:id").get(validateUser,getSingleBlog)
router.route("/getBlogLikes/:id").get(validateUser,getBlogLikes)
router.route("/getBlogComments/:id").get(validateUser,getAllComments)
router.route("/getMyBlogs").get(validateUser,getMyBlogs)
router.route("/like/status/:id").get(validateUser,checkUserLikedBlog)

router.route("/post").post(validateUser,
    upload.fields([
    {
        name:"image",
        maxCount: 1
    }
]),postBlog)
router.route("/like/:id").post(validateUser,likingBlog)
router.route("/comment/:id").post(validateUser,commentingBlog)

router.route("/updateBlog/:id").put(validateUser,updateBlog)
router.route("/updateImage/:id").put(upload.fields([
    {
        name:"image",
        maxCount: 1
    }
]),validateUser,updateBlogImage)

router.route("/deleteBlog/:id").delete(validateUser,deleteBlog)
router.route("/deleteComment/:id").delete(validateUser,deleteComment)


export default router;