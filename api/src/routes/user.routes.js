import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
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
export default router