import { uploadOnCloudinary } from "../cloudinary/cloudinary.upload.js";
import { User } from "../models/user.model.js";

const registerUser = async(req,res) => {
    const {email, username, fullName, password} = req.body;

    try {
        if (!email || !username || !fullName || !password) {
             return res.status(400).json({
                message: "All Fields are required!",
                status: 400,
             })
        }
    
        const existedUser = await User.findOne({email});
    
        if (existedUser) {
            return res.status(400).json({
                message: "Email is already used by another user",
                status: 400,
             })
        }

        const avatarLocalPath = req.files?.avatar[0]?.path;

        if (!avatarLocalPath) {
            return res.status(400).json({
                message: "please upload image",
                status: 400,
             })
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);

        if (!avatar) {
            return res.status(500).json({
                message: "Something Went wrong while uploading image, please try again later!",
                status: 500,
             })
        }

        const user = await User.create({
            email,
            fullName,
            username,
            password,
            avatar: avatar.url
        })
    
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        res.status(201).json({
            message:"User Registered Successfully!",
            status: 201,
            createdUser
        })
    
    } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While Registering a User!!",
            status: 500,
            errorMessage: error.message,
            error
         })
    }
}

const loginUser = async(req,res) => {
    const {username, password} = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({
                message: "All fields are required!",
                status: 400,
             })
        }
    
        const user = await User.findOne({username})
    
        if (!user) {
            return res.status(400).json({
                message: "username is not Registered",
                status: 400,
             })
        }
    
        const isMatch = await user.isPasswordCurrect(password)
        
        if(!isMatch){
            return res.status(400).json({
                message: "Username or Password is Incorrect!",
                status: 400,
             })
        }
    
        const refreshToken = await user.generateAccessToken(user._id)
    
        user.refreshToken = refreshToken;
    
        await user.save({ validateBeforeSave: false })
      
        const option = {
            httpOnly: true,
            secure: true
           }
    
        res.status(200)
        .cookie("refreshToken",refreshToken,option)
        .json({
            message:"User LoggedIn Successfully!",
            status: 200,
            user,
            refreshToken
        })
    
    } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong while loggin a user !!",
            status: 500,
            errorMessage: error.message,
            error
         })
    }
}

const logoutUser = async(req,res) => {
    const user = req.user;

    await User.findByIdAndUpdate(user._id,{
        $unset:{
            refreshToken: null
        },
    },
       {
          new: true
       }
    )

    res.status(200).json({
        message: "User LoggedOut Successfully!",
        status:200,
        user
    })

}

const updateUserInfo = async(req,res) => {
    try {
        const { id } = req.params;
        const { username, fullName, email } = req.body;
    

        const user = await User.findById({
            _id:id
        })
    
        if (!user) {
            return res.status(404).json({
                message:"User Not Found!",
                status: 404
            })
        }

        if (!username && !fullName && !email) {
          return res.status(400).json({
            message:"Please Update atleast One of these fields!",
            status:400
          })  
        }
    
        const existedUserWithEmail = await User.findOne({email});
        
        if (existedUserWithEmail) {
            return res.status(400).json({
                message: "Email is already used by another user",
                status: 400,
             })
        }
    
        const existedUserWithUsername = await User.findOne({username});
        
        if (existedUserWithUsername) {
            return res.status(400).json({
                message: "Username is already used by another user",
                status: 400,
             })
        }
         

        await User.findByIdAndUpdate({
            _id:id
        },{
            username,
            fullName,
            email,
            
        })

        const updatedUser = await User.findById({_id:id})

        res.status(200).json({
            message: "User updated Successfully!",
            status: 200,
            updatedUser
        })

    } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While updating a User!!",
            status: 500,
            errorMessage: error.message,
            error
         })
    }


}

const updateAvatar = async(req,res) => {

   try {
     const { id } = req.params;
 
     const user = await User.findById({
         _id:id
     })
 
     if (!user) {
         return res.status(404).json({
             message:"User Not Found!",
             status: 404
         })
     }
    
     const avatarLocalPath = req.files?.avatar[0]?.path;
 
     if (!avatarLocalPath) {
         return res.status(400).json({
             message: "please upload image",
             status: 400,
          })
     }
 
     const avatar = await uploadOnCloudinary(avatarLocalPath);
 
     if (!avatar) {
         return res.status(500).json({
             message: "Something Went wrong while uploading image, please try again later!",
             status: 500,
          })
     }
    
     await User.findByIdAndUpdate({
        _id:id
    },{
       avatar: avatar.url
        
    })

     const updatedUserWithAvatar = await User.findById({
         _id:id
     })
 
    res.status(200).json({
     message: "Avatar Updated Successfully!",
     status: 200,
     updatedUserWithAvatar
    })
 
   } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While updating a User!!",
            status: 500,
            errorMessage: error.message,
            error
        })
   }
}

const deleteUser = async(req,res) => {
  try {
     const { id } = req.params;
  
     const user = await User.findByIdAndDelete({
      _id:id
     })
   
      if (!user) {
          return res.status(404).json({
              message:"User Not Found!",
              status: 404
          })
      }
     
      res.status(200).json({
          message: "User Deleted Successfully!",
          status: 200
      })
  } catch (error) {
    return res.status(500).json({
        message: "OOPS!! Something Went Wrong While Deleting a User!!",
        status: 500,
        errorMessage: error.message,
        error
     })
  }


}


const getAllUsers = async(req,res) => {
    
   try {
     const users = await User.find({}).select("-password -refreshToken")
 
     res.status(200).json({
         message: "All user Fetched Successfully!",
         status:200,
         users
     })

   } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While fetching Users!!",
            status: 500,
            errorMessage: error.message,
            error
        })
   }

}

export {
    registerUser,
    loginUser,
    logoutUser,
    updateUserInfo,
    updateAvatar,
    deleteUser,
    getAllUsers
}