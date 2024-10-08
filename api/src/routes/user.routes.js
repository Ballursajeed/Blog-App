import { Router } from "express";
import { checkAuthAndUserDetails, deleteUser, 
         getAllUsers, 
         getSingleUser, 
         loginUser, 
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
router.route("/deleteUser/:id").delete(validateUser,deleteUser)
router.route("/getAllUsers").get(getAllUsers)
router.route("/getSingleUser/:id").get(getSingleUser)
router.route("/me").get(validateUser, checkAuthAndUserDetails);

export default router