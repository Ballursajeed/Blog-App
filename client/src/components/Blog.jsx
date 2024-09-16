import React, { useEffect, useState } from 'react';
import "../styles/Blog.css"
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import axios from 'axios';
import { SERVER } from '../constants/constants';
import { Link } from 'react-router-dom';

const Blog = ({
  blog
}) => {

    const [liked, setLiked] = useState(false);
    const [likeCount,setLikeCount] = useState(blog.likes);

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

    useEffect(() => {

      }, []);

    const handleComment = async() => {
        
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
    <Link className='read-blog' to="/single-blog">
      Read Full Blog
    </Link>
    
  </div>
  
         <div className="social-icons">
            <button className='likeCount'>{likeCount}</button>
            <i
              className={`fas fa-heart ${liked ? 'liked' : 'unliked'}`}
              onClick={handleLikeUnlike}
            ></i>
           
            <i className="fas fa-comment" 
              onClick={handleComment} 
            ></i>
           
          </div>
          <div className="date">
            <span className="blog-time"> {weekday} {formatedDate}</span>
          </div>
</div>

    </div>
    </>
  )
}

export default Blog
