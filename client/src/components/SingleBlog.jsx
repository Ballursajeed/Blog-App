import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SERVER } from '../constants/constants'
import Blog from './Blog'
import Navbar from './Navbar'

const SingleBlog = () => {

    const { id } = useParams();
    const [blog, setBlog] = useState();


    useEffect(() => {
        const getSingleBlog = async() => {
            const res = await axios.get(`${SERVER}/blog/getSingleBlog/${id}`,{
                withCredentials: true
            });
      if (res.data.status === 200) {
        setBlog(res.data?.blog.blog)
      }
       
        }

        getSingleBlog()
    },[])

    console.log("blog:  ",blog);
    

  return (
    <div>
        <Navbar />
        {
            blog ? <Blog blog={blog} single={true}/> : (<></>)
        }
    </div>
  )
}

export default SingleBlog
