import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password:{
            type: String,
            required: true,
        },
        avatar: {
            type: String // cloudinary URL,
        },
        refreshToken: {
            type: String,
        },
        blogs:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Blog"
            }
        ],
    },
    {
        timestamps: true
    }
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCurrect = async function(password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign({
    _id:this._id
  },
   process.env.ACCESS_TOKEN_SECRET,
   {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE
   }
  )
}

export const User = mongoose.model("User",userSchema);