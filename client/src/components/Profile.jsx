import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import "../styles/Profile.css"
import { useSelector } from 'react-redux';
import Blog from './Blog';
import { SERVER } from '../constants/constants';
import axios from 'axios';

const Profile = () => {

    const auth = useSelector((state) => state.auth);

    const [blogs,setBlogs] = useState([]);

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
      <Navbar />
      <div className="Profile-container">
        <div className="Profile-card">
          <img src={auth.user?.avatar ? auth.user.avatar : '/default-profile-image.webp' } alt="Avatar" />
          <h2 className="Profile-fullname">{auth.user.fullName}</h2>
          <p className="Profile-username">{auth.user.username}</p>
          <p className="Profile-blog">Blog Published:{auth.user?.blogs?.length}</p>
          <button className='Profile-btn'>edit</button>
          <button className='Profile-btn'>delete Profile</button>
        </div>
          <div className="Profile-userblogs">
          <h2>Your Blogs:</h2>
          {
         blogs.map((blog,index) => {
          return (
            <Blog blog={blog} key={index}/>
          )
        })
      }
          </div>
      </div>
    </>
  )
}

export default Profile
