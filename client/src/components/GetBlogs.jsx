import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SERVER } from '../constants/constants';
import Blog from './Blog';

const GetBlogs = () => {

    const [blogs,setBlogs] = useState([]);

    useEffect(() => {

        const getBlogs = async() => {
            const res = await axios.get(`${SERVER}/blog/getAllBlogs`,{
                withCredentials: true
              });
              console.log(res.data.blogs);
              setBlogs(res.data.blogs)
        }
     getBlogs()
          
    },[])

  return (
    <>
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

export default GetBlogs
