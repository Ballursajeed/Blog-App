import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SERVER } from '../constants/constants';
import "../styles/Single-User.css"
import UserBlogs from './UserBlogs';

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
            
            setUser(res.data?.user)
         }
       }
       const getBlogs = async() => {
        const res = await axios.get(`${SERVER}/blog/getUserBlog/${id}`,{
            withCredentials: true
          });
          setBlogs(res.data.blogs)
    }
    getSingleUser()
       getBlogs()

    },[]);

    

    

  return (
    <>
    <div className="single-container">
      <div className="single-card">
        <img src={user?.avatar ? user.avatar : '/default-profile-image.webp' } alt="Avatar" />
        <h2 className="single-fullname">{user.fullName}</h2>
        <p className="single-username">{user.username}</p>
        <p className="single-blog">Blog Published:{user?.blogs?.length}</p>
      </div>
        <div className="single-userblogs">
        <h2>Blogs:</h2>
        {
       blogs.map((blog,index) => {
        return (
          <UserBlogs blog={blog} single={false} key={index}/>
        )
      })
    }
        </div>
    </div>
  </>
  )
}

export default SingleUser
