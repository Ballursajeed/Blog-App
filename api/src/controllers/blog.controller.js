import mongoose, { mongo } from "mongoose";
import { Blog } from "../models/blog.model.js";
import { Like } from "../models/like.model.js";
import { Comment } from "../models/comment.model.js";
import { uploadOnCloudinary } from "../cloudinary/cloudinary.upload.js";
import { User } from "../models/user.model.js";

const postBlog = async(req,res) => {
    const { title, content, summary } = req.body;   

    try {


        if (!title || !content) {
            return res.status(400).json({
                message: "All fields are required!",
                status: 400,
            })
        }
      
        let image;

        // Check if the image was uploaded
        if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
            const fileBuffer = req.files.image[0].buffer;
            image = await uploadOnCloudinary(fileBuffer);  // Upload directly from buffer
        }

       const author = req.user;
    
       const blog = await Blog.create({
            title,
            content,
            summary,
            author: author?._id,
            image: image?.url || ""
        })
        
        author.blogs.push(blog._id);
        await author.save({ validateBeforeSave: false });

        res.status(201).json({
            message: "Blog Posted Successfully!",
            status: 201,
            blog,
        });
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
        
        const blogs = await Blog.find({}).lean();
        
        let blogsWithUser = []
        for (let i = 0; i < blogs.length; i++) {
            let blog = blogs[i];
            let user = await User.findById({_id: blog.author});

            blog.user = user;

            blogsWithUser.push(blog);
        }        
      
        res.status(200).json({
            message: "All Blogs are fetched!",
            status: 200,
            blogs:blogsWithUser
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
        }).lean()

        if (!blog) {
            return res.status(404).json({
                message:"Blog Not Found!",
                status:404
            })
        }
    
        let user = await User.findById({_id: blog.author}).select("-password -refreshToken")
   
        const blogWithUser = {

        } 

        blogWithUser.blog = blog;
        blogWithUser.blog.user = user

        res.status(200).json({
            message: "Single Blog Fetched!",
            status: 200,
            blog:blogWithUser
       
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

const getUserBlog = async(req,res) => {
    const { id } = req.params;

    const user = await User.findById({
        _id: id
    })

    if (!user) {
        return res.status(404).json({
            message: "User Not Found!",
            status: 404
        })
    }

    const blogsIds  = user.blogs
 
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
      }).lean() 
     blogs.push(blog)    
   }

   let blogsWithUser = []
   for (let i = 0; i < blogs.length; i++) {
       let blog = blogs[i];
       let user = {};
       if (blog?.author) {
         user = await User.findById({_id: blog?.author});
         blog.user = user;
         blogsWithUser.push(blog);
       }
   }        
 
   res.status(200).json({
    message:"Fetched User's Blogs!",
    status: 200,
    blogs: blogsWithUser
  })

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
            updatedBlog,
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
    
     const unlike = await Like.findByIdAndDelete(existingLike._id);

      blog.likes = blog.likes - 1;
      await blog.save({ validateBeforeSave: true });

      return res.status(200).json({
        message: "Blog unliked successfully!",
        status: 200,
        unlike
      });
    } 
        blog.likes = blog.likes + 1;
        blog.save({validateBeforeSave: true})
        
       const like = await Like.create({
            likedBy: userId,
            blog: id
        })

        res.status(200).json({
            message: "Blog Liked Successfully!",
            status: 200,
            blog,
            like
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

const checkUserLikedBlog = async(req,res) => {
      const { id } = req.params;
try {
    
    
          if (!id) {
            return res.status(404).json({
                message:"didn't recive an Id",
                status: 404
          })        
          }
    
          const userLikedBlogs = await Like.aggregate([
            {
                $match:{
                    likedBy: req.user?._id
                }
            },
            {
                $match:{
                    blog: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $project:{
                    _id:1,
                    blog:1,
                    likedBy:1
                }
            }
          ]);
    
          if (userLikedBlogs.length === 0) {
            return res.status(200).json({
                isLiked: false,
            })
          }
        
        const blogInLike = (userLikedBlogs[0].blog).toString();
        const likedbyUser = (userLikedBlogs[0].likedBy).toString();
    
          if (blogInLike === id && likedbyUser === (req.user._id).toString()) {
              return res.status(200).json({
                isLiked: true
              })
             
           }
          
} catch (error) {
    return res.status(500).json({
        message: "OOPS!! Something Went Wrong While Fetching likes on a Blog!!",
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
    
       const createdComment = await Comment.create({
              content,
               blog: blog._id,
               owner: req.user?._id
        })

        const comment = await Comment.findById({_id: createdComment?._id}).lean()

        const user = await User.findById({_id: req.user?._id});
       
        const userDetails = [user];
    
        comment.userDetails = userDetails

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

 const deleteComment = async(req,res) => {
    try {
        const { id } = req.params;
    
        const comment = await Comment.findById({
            _id: id
        });
    
        if (!comment) {
            return res.status(404).json({
                message: "Comment Not Found",
                status: 404
            })
        }
    
        await Comment.findByIdAndDelete({
            _id: id
        })
    
        res.status(200).json({
            message:"Comment Deleted Successfully!",
            status: 200
        })
    
    } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While Deleting Comment!!",
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
      }).lean() 
     blogs.push(blog)    
   }

   let blogsWithUser = []
   for (let i = 0; i < blogs.length; i++) {
       let blog = blogs[i];
       let user = {};
       if (blog?.author) {
         user = await User.findById({_id: blog?.author});
         blog.user = user;
         blogsWithUser.push(blog);
       }
   }        
 
 
   res.status(200).json({
     message:"Fetched MY Blogs!",
     status: 200,
     blogs: blogsWithUser
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

const updateBlogImage = async(req,res) => {
    try {
        const { id } = req.params;
    
        const blog = await Blog.findById({
            _id:id
        })
    
        if (!blog) {
            return res.status(404).json({
                message:"blog Not Found!",
                status: 404
            })
        }
       
        let image;

        // Check if the image was uploaded
        if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
            const fileBuffer = req.files.image[0].buffer;
            image = await uploadOnCloudinary(fileBuffer);  // Upload directly from buffer
        }
    
        if (!image) {
            return res.status(500).json({
                message: "Something Went wrong while uploading image, please try again later!",
                status: 500,
             })
        }
       
        await Blog.findByIdAndUpdate({
           _id:id
       },{
          image: image?.url
           
       })
   
        const updatedBlogWithImage = await Blog.findById({
            _id:id
        })
    
       res.status(200).json({
        message: "Image Updated Successfully!",
        status: 200,
        updatedBlogWithImage
       })
    
      } catch (error) {
           return res.status(500).json({
               message: "OOPS!! Something Went Wrong While updating a Blog!!",
               status: 500,
               errorMessage: error.message,
               error
           })
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
    getMyBlogs,
    checkUserLikedBlog,
    updateBlogImage,
    deleteComment,
    getUserBlog
}