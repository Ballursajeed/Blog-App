import React, { useEffect, useState } from 'react'
import "../styles/Profile.css"
import { useSelector } from 'react-redux';
import { SERVER } from '../constants/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserBlogs from './UserBlogs';

const Profile = () => {

    const auth = useSelector((state) => state.auth);

    const [blogs,setBlogs] = useState([]);
    const navigate = useNavigate()

    const handleDelete = async() => {
      window.alert("Do you want to delete Your Account?");
      
      try {
        const res = await axios.delete(`${SERVER}/user/deleteUser/${auth.user?._id}`, {
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

    const handleEdit = async() => {
         navigate(`/edit-profile/${auth.user?._id}`)
    } 

    useEffect(() => {

        const getBlogs = async() => {
            const res = await axios.get(`${SERVER}/blog/getMyBlogs`,{
                withCredentials: true
              });
              console.log(res.data.blogs);
              setBlogs(res.data.blogs)
        }
     getBlogs()
          
    },[])

  return (
    <>

      <div className="Profile-container">
        <div className="Profile-card">
          <img src={auth.user?.avatar ? auth.user.avatar : '/default-profile-image.webp' } alt="Avatar" />
          <h2 className="Profile-fullname">{auth.user.fullName}</h2>
          <p className="Profile-username">{auth.user.username}</p>
          <p className="Profile-blog">Blog Published:{auth.user?.blogs?.length}</p>
          <button className='Profile-btn' onClick={handleEdit}>edit</button>
          <button className='Profile-btn' onClick={handleDelete}>delete Profile</button>
        </div>
          <div className="Profile-userblogs">
        <h2>Your Blogs:</h2>

          {
         blogs.map((blog,index) => {
          return (
            <UserBlogs blog={blog} key={index} single={false}/>
          )
        })
      }
          </div>
      </div>
    </>
  )
}

export default Profile
