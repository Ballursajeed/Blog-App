import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        owner: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        },
        content: {
            type: String,
            required: true,
        },
        blog:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Blog" 
        }
    },
    {
        timestamps: true
    }
);

export const Comment = mongoose.model("Comment",commentSchema);