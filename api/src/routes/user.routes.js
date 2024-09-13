import { Router } from "express";
import { loginUser, 
         logoutUser, 
         registerUser, 
         updateAvatar, 
         updateUserInfo } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middlerware.js";
import { validateUser } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount: 1
        }
    ])
    ,registerUser)

router.route("/login").post(loginUser)
router.route("/logout").post(validateUser,logoutUser)
router.route("/updateUserInfo/:id").put(validateUser,updateUserInfo)
router.route("/updateAvatar/:id").put(upload.fields([
    {
        name:"avatar",
        maxCount: 1
    }
]),validateUser,updateAvatar)

export default router