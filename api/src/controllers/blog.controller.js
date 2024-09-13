import { Blog } from "../models/blog.model.js";


const postBlog = async(req,res) => {
    const { title, content, summary } = req.body;   

    try {
        if (!title || !content) {
            return res.status(400).json({
                message: "All fields are required!",
                status: 400,
            })
        }
    
        const author = req.user;
    
       const blog = await Blog.create({
            title,
            content,
            summary,
            author
        })
    
        res.status(201).json({
            message: "Blog Posted Successfully!",
            status:201,
            blog
        })
    } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While Fetching a Blogs!!",
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
    
        if (!id) {
            return res.status(400).json({
                message:"Please Select the blog to open!",
                status:400
            })
        }

        const blog = await Blog.findById({
            _id:id
        })
    
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

export {
    postBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
}