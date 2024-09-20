import React, { useEffect, useState } from 'react'
import Avatar from './Avatar';
import axios from 'axios';
import { SERVER } from '../constants/constants';
import "../styles/ShowLike.css"

const ShowLike = ({blog, close}) => {

  const [userDetails,setUserDetails] = useState([])

    useEffect(() => {
        const getLikes = async() => {
            const res = await axios.get(`${SERVER}/blog/getBlogLikes/${blog?._id}`,{
              withCredentials: true
            });
            
           setUserDetails(res.data?.likes);
             
          }

          getLikes()

    },[])



  return (
    <div className='likeContainer'>
      <h3>Liked By</h3> 
      <button className='closeButton' onClick={close}>X</button>
      {
        userDetails.map((user) => {
           return( <Avatar key={user._id} user = {user.userDetails}/>)
        }
        )
      }
    </div>
  )
}

export default ShowLike
