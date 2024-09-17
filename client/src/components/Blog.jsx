import React, { useEffect, useState } from 'react';
import "../styles/Blog.css"
import axios from 'axios';
import { SERVER } from '../constants/constants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import ShowLike from './ShowLike';

const Blog = ({
  blog
}) => {

    const auth = useSelector((state) => state.auth);

    const [liked, setLiked] = useState(false);
    const [likeCount,setLikeCount] = useState(blog.likes);

    const navigater = useNavigate()

    const handleLikeUnlike = async () => {
 
            const response = await axios.post(`${SERVER}/blog/like/${blog._id}`,{},{
                withCredentials:true
            })
 
            if (response.data?.message === 'Blog unliked successfully!' ) {                    
                setLikeCount((prev) => prev = prev - 1)
            }

             if (response.data?.message === 'Blog Liked Successfully!' ) {
                 setLikeCount((prev) => prev = prev + 1)
             }

            if (response.data?.status >= 200 && response.status < 300) {
                setLiked(!liked);
            } 
          console.log(response.data);
          
    };

    

    const navigateTo = () => {
         navigater(`/single-blog/${blog._id}`)
    }

    useEffect(() => {
          const checkUserLikedBlog = async() => {
            const res = await axios.get(`${SERVER}/blog/like/status/${blog._id}`,{
              withCredentials: true
            });
            console.log("is Liked",res.data);
            if (res.data?.isLiked) {
                setLiked(!liked)
            }
            
          }
          checkUserLikedBlog()
      }, []);

    const handleComment = async() => {
        
    }

    const handleDelete = async() => {
       window.alert("Do you want to delete the blog??");
      
        try {
          const res = await axios.delete(`${SERVER}/blog/deleteBlog/${blog._id}`, {
            withCredentials: true
          });
          
          if (res.status === 200) {
            console.log(res.data);
            // Refresh the page after successful deletion
            window.location.reload();
          } else {
            console.error("Failed to delete the blog");
          }
        } catch (error) {
          console.error("Error deleting the blog:", error);
        }
    }

    const handleUpdate = async() => {
           navigater(`/update-blog/${blog._id}`)
    }

     const date = new Date(blog.createdAt)

     const formatedDate = date.toLocaleString('en-GB', {
            day: '2-digit',    
            month: '2-digit',  
            year: 'numeric'    
     })

      const weekday = date.toLocaleString('en-US',{
          weekday: 'long'
      }) 


      const admin = blog?.author === auth.user?._id;
 

  return (
    <>
      <div className='container'>
        <div className="card">
            <div className="blogHeader">
             <img className="avatar" 
                  src={blog.user?.avatar ? blog.user.avatar : '/default-profile-image.webp'}
                  alt="User Avatar" />
               <div className="username"> {blog.user?.username}</div>
            </div>
    <div className="card-img-holder">
    <img src={blog.image} alt="Blog image" />
  </div>
  <h3 className="blog-title">{blog.title}</h3>
  <p className="description">
   {blog.content}
  </p>
  <div className="options">
    <span className='read-blog' onClick={navigateTo} >
      Read Full Blog
    </span>
    
  </div>
  
         <div className="social-icons">
            <Popup trigger=
                {<button className='likeCount'>{likeCount}</button>}
                position="right center">
               <ShowLike blog = {blog} />
            </Popup>
            <i
              className={`fas fa-heart ${liked ? 'liked' : 'unliked'}`}
              onClick={handleLikeUnlike}
            ></i>
           
            <i className="fas fa-comment" 
              onClick={handleComment} 
            ></i>
           
          </div>
          {
               admin ? 
               (
                <div className="auth-btn">
                <button className="edit" onClick={handleUpdate}> Edit</button>
                <button className="delete" onClick={handleDelete}> delete</button>
               </div>
               ) : (
                <></>
               )
          }
          
          <div className="date">
            <span className="blog-time"> {weekday} {formatedDate}</span>
          </div>
</div>

    </div>
    </>
  )
}

export default Blog
