import React, { useEffect, useState } from 'react';
import "../styles/Blog.css"
import axios from 'axios';
import { SERVER } from '../constants/constants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import ShowLike from './ShowLike';
import Comments from './Comments';

const UserBlogs = ({
  blog ,single
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
          
    };

    

    const navigateTo = () => {
         navigater(`/single-blog/${blog._id}`)
    }

    useEffect(() => {
          const checkUserLikedBlog = async() => {
            const res = await axios.get(`${SERVER}/blog/like/status/${blog._id}`,{
              withCredentials: true
            });
            if (res.data?.isLiked) {
                setLiked(!liked)
            }
            
          }
          checkUserLikedBlog()
      }, []);

    const handleComment = async() => {
        navigater(`/single-blog/${blog._id}`)
    }

    const handleDelete = async() => {
       window.alert("Do you want to delete the blog??");
      
        try {
          const res = await axios.delete(`${SERVER}/blog/deleteBlog/${blog._id}`, {
            withCredentials: true
          });
          
          if (res.status === 200) {
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

 
      const getSingleUser = () => {
        navigater(`/single-user/${blog?.user?._id}`)
      }

      const content = (blog.content).split(' ');

      const shorterContent = [];
      
      for (let i = 0; i < 20; i++) {
        const word = content[i];
        shorterContent.push(word)
      }
     
      
      const admin = blog?.author === auth.user?._id;

  return (
    <>
        <div className="card">
            <div onClick={getSingleUser} className="blogHeader">
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
   {single ? blog.content : shorterContent.join(' ')  }{
    single ? <></> : <>......</>
   }
  </p>
  <div className="options">
    {
      single ? <></> :  <span className='read-blog' onClick={navigateTo} >
      Read Full Blog
    </span>
    }
   
  </div>
         <div className="social-icons">
            <Popup trigger=
                {<button className='likeCount'>{likeCount}</button>}
                position="right center">
               {close => (
                 <ShowLike blog={blog} close={close} />
                )}
            </Popup>
            <i
              className={`fas fa-heart ${liked ? 'liked' : 'unliked'}`}
              onClick={handleLikeUnlike}
            ></i>

               <Popup trigger=
                {<i className="fas fa-comment" 
                  onClick={handleComment} 
                ></i>}
                position="right center">
               {close => (
                 <Comments blog={blog} close={close}/>
                )}
            </Popup> 
           
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

    </>
  )
}

export default UserBlogs
