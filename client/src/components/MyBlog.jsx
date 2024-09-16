import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SERVER } from '../constants/constants';
import Blog from './Blog';
import Navbar from './Navbar';

const MyBlog = () => {

    const [blogs,setBlogs] = useState([]);

    useEffect(() => {

        const getBlogs = async() => {
            const res = await axios.get(`${SERVER}/blog/getMyBlogs`,{
                withCredentials: true
              });
              setBlogs(res.data.blogs)
        }
     getBlogs()
          
    },[])

    

  return (
    <>
    <Navbar />
      {
        blogs.map((blog,index) => {
          return (
            <Blog blog={blog} key={index}/>
          )
        })
      }
    </>
  )
}

export default MyBlog
