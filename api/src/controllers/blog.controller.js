import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { Like } from "../models/like.model.js";
import { Comment } from "../models/comment.model.js";
import { uploadOnCloudinary } from "../cloudinary/cloudinary.upload.js";

const postBlog = async(req,res) => {
    const { title, content, summary } = req.body;   

    try {

        console.log(title, content);
        

        if (!title || !content) {
            return res.status(400).json({
                message: "All fields are required!",
                status: 400,
            })
        }
      
        let imagePath;

        if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
            imagePath = req.files.image[0].path;
         }

         const image = await uploadOnCloudinary(imagePath)

       const author = req.user;
    
       const blog = await Blog.create({
            title,
            content,
            summary,
            author,
            image: image?.url || ""
        })
        
       const blogs = author.blogs;
       blogs.push(blog)
       author.blogs = blogs;
        author.save({validateBeforeSave: false})
        
        res.status(201).json({
            message: "Blog Posted Successfully!",
            status:201,
            blog
        })
    } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While Posting a Blog!!",
            status: 500,
            errorMessage: error.message,
            error
         })
    }

}

const getAllBlogs = async(req,res) => {
    try {
        
        const blogs = await Blog.find({});

        res.status(200).json({
            message: "All Blogs are fetched!",
            status: 200,
            blogs
        })

    } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While Posting a Blog!!",
            status: 500,
            errorMessage: error.message,
            error
         })
    }
}

const getSingleBlog = async(req,res) => {
    try {
        const { id } = req.params;
    
        const blog = await Blog.findById({
            _id:id
        })

        if (!blog) {
            return res.status(404).json({
                message:"Blog Not Found!",
                status:404
            })
        }
    
        res.status(200).json({
            message: "Single Blog Fetched!",
            status: 200,
            blog
        })

    } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While Fetching a Blog!!",
            status: 500,
            errorMessage: error.message,
            error
         })
    }

}

const updateBlog = async(req,res) => {
    try {
        
        const { id } = req.params;
        const { title, content, summary} = req.body;

        if (!id) {
            return res.status(400).json({
                message:"Please Select the blog to update!",
                status:400
            })
        }


        const updatedBlog = await Blog.findByIdAndUpdate({
            _id: id
        },{
               title,
               content,
               summary
        })

        res.status(200).json({
            message: "Blog Updated Successfully!",
            status: 200,
            updateBlog,
        })

    } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While Updating a Blog!!",
            status: 500,
            errorMessage: error.message,
            error
         })
    }
}

const deleteBlog = async(req,res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message:"Please Select the blog to delete!",
                status:400
            })
        }
    
        await Blog.findByIdAndDelete({
            _id:id
        })
    
        res.status(200).json({
            message:"Blog Deleted Successfully!",
            status: 200
        })
    } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While Deleting a Blog!!",
            status: 500,
            errorMessage: error.message,
            error
         })
    }

}

const likingBlog = async(req,res) => {
  
    try {
     
        const { id } = req.params;
        const userId = req.user?._id;

        const blog = await Blog.findById({
            _id: id
        });

        if (!blog) {
            return res.status(404).json({
                message: "Blog Not Found!",
                status:404
            })
        }

       
    const existingLike = await Like.findOne({ likedBy: userId, blog: id });

    if (existingLike) {
    
      await Like.findByIdAndDelete(existingLike._id);

      blog.likes = blog.likes - 1;
      await blog.save({ validateBeforeSave: true });

      return res.status(200).json({
        message: "Blog unliked successfully!",
        status: 200,
      });
    } 
        blog.likes = blog.likes + 1;
        blog.save({validateBeforeSave: true})
        
        await Like.create({
            likedBy: userId,
            blog: id
        })

        res.status(200).json({
            message: "Blog Liked Successfully!",
            status: 200,
            blog
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While Liking a Blog!!",
            status: 500,
            errorMessage: error.message,
            error
         })
    }

}

const commentingBlog = async(req,res) => {
    try {
        
        const { id } = req.params;
        const { content } = req.body;
    
        const blog = await Blog.findById({
            _id: id
        })
    
        if (!content) {
            return res.status(400).json({
                message:"Please fill the comment!",
                status: 400
            })
        }

        if (!blog) {
            return res.status(404).json({
                message:"Blog Not Found!",
                status: 404
            })
        }
    
       const comment = await Comment.create({
              content,
               blog: blog._id,
               owner: req.user?._id
        })
    
        res.status(201).json({
            message: "Comment added Successfully!",
            status: 201,
            comment,
        })
    } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While Commenting on a Blog!!",
            status: 500,
            errorMessage: error.message,
            error
         })
    }

}

const getAllComments = async(req,res) => {
   try {
     const { id } = req.params;
 
     const blog = await Blog.findById({
         _id: id
     })
 
     if (!blog) {
         return res.status(404).json({
             message:"Blog Not Found!",
             status: 404
         })  
       }
 
       const comments = await Comment.aggregate([
         {
             $match: {
                 blog: new mongoose.Types.ObjectId(id)
             }
         },
         {
             $lookup:{
                 from: "users",
                 localField:"owner",
                 foreignField:"_id",
                 as: "userDetails"
             }
         },

         {
             $project:{
                 _id:1,
                 owner: 1,
                 content:1,
                    "userDetails.fullName": 1, // Select specific fields
                     "userDetails.username": 1,
                     "userDetails.avatar": 1,
                 }
         }
       ]);
 
       res.status(200).json({
         message: "Blog comments Fetched Successfully!",
         status:200,
         comments
     })
   } catch (error) {
    return res.status(500).json({
        message: "OOPS!! Something Went Wrong While Fetching Blog Comments!!",
        status: 500,
        errorMessage: error.message,
        error,
      });
   }

 }

const getBlogLikes = async(req,res) => {
    
    try {
        const { id } = req.params;
    
        const blog = await Blog.findById({
            _id: id
        })
    
        if (!blog) {
            return res.status(404).json({
                message:"Blog Not Found!",
                status: 404
            })
        }
    
        const likes = await Like.aggregate([
            {
                $match: { blog:  new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup:{
                  from: "users",
                  localField:"likedBy",
                  foreignField:"_id",
                  as: "userDetails"
                }
            },
            {
                $project:{
                    _id: 1,
                    likeBy: 1,
                    "userDetails.fullName": 1, // Select specific fields
                    "userDetails.username": 1,
                    "userDetails.avatar": 1,
                }
            }
        ]);
    
        res.status(200).json({
            message: "Blog Likes Fetched Successfully!",
            status:200,
            likes
        })
    
    } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While Fetching Blog Likes!!",
            status: 500,
            errorMessage: error.message,
            error,
          });
    }
}

const getMyBlogs = async(req,res) => {
   try {
    const blogsIds  = req.user?.blogs
 
    if (blogsIds.length === 0) {
        return res.status(404).json({
            message: "You don not Posted any Blogs!",
            status: 404
        })
    }

   const blogs = [];
 
   for (let i = 0; i < blogsIds.length; i++) {
      const id = blogsIds[i];
      const blog = await Blog.findById({
         _id: id
      }) 
     blogs.push(blog)    
   }
 
   res.status(200).json({
     message:"Fetched User's Blogs!",
     status: 200,
     blogs
   })
   } catch (error) {
        return res.status(500).json({
        message: "OOPS!! Something Went Wrong While Fetching User's Blog!!",
        status: 500,
        errorMessage: error.message,
        error,
        });
   }

}

export {
    postBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    likingBlog,
    commentingBlog,
    getBlogLikes,
    getAllComments,
    getMyBlogs
}