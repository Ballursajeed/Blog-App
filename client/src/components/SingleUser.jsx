import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SERVER } from '../constants/constants';
import Navbar from './Navbar';
import Blog from './Blog';

const SingleUser = () => {

    const {id} = useParams();
    const [user,setUser] = useState({});
    const [blogs,setBlogs] = useState([]);

    useEffect(() => {
       const getSingleUser = async() => {
        const res = await axios.get(`${SERVER}/user/getSingleUser/${id}`,{
            withCredentials: true
        })
        
        if (res.data?.status === 200) {
            console.log(res.data);
            
            setUser(res.data?.user)
         }
       }
       const getBlogs = async() => {
        const res = await axios.get(`${SERVER}/blog/getUserBlog/${id}`,{
            withCredentials: true
          });
          console.log(res.data.blogs);
          setBlogs(res.data.blogs)
    }
    getSingleUser()
       getBlogs()

    },[]);

    

    console.log("single User:",user);
    

  return (
    <>
    <Navbar />
    <div className="Profile-container">
      <div className="Profile-card">
        <img src={user?.avatar ? user.avatar : '/default-profile-image.webp' } alt="Avatar" />
        <h2 className="Profile-fullname">{user.fullName}</h2>
        <p className="Profile-username">{user.username}</p>
        <p className="Profile-blog">Blog Published:{user?.blogs?.length}</p>
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

export default SingleUser
