import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import Avatar from './Avatar';
import axios from 'axios';
import { SERVER } from '../constants/constants';

const ShowLike = ({blog}) => {

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
      {
        userDetails.map((user) => <Avatar user = {user.userDetails}/>
        )
      }
    </div>
  )
}

export default ShowLike
