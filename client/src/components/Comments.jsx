import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SERVER } from '../constants/constants'
import Avatar from './Avatar';
import "../styles/Comment.css"

const Comments = ({blog}) => {

    const [comments,setComments] = useState([]);


    useEffect(() => {
        const getAllComments = async() => {
            const res = await axios.get(`${SERVER}/blog/getBlogComments/${blog?._id}`,{
                withCredentials: true
            });
            if (res.data?.status === 200) {
            setComments(res.data?.comments)    
            }
            
        }
      getAllComments()
    },[])

    console.log(comments[0]?.userDetails[0]?.username);
    

  return (
    <div>
     {
        comments.map((comment) => 
        {
            return ( <> <div className='commentContainer'>
                   <Avatar key={comment._id} user = {comment.userDetails}/> 
                   <div>{comment?.content}</div>
            </div>
                      </> 
            )
        }   
        )
      }
    </div>
  )
}

export default Comments
