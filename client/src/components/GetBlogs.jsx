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

    console.log("state blogs:",blogs);
    

  return (
    <>
      <Blog />
      <Blog />
      <Blog />
    </>
  )
}

export default GetBlogs
