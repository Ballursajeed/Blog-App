import React from 'react'
import "../styles/Avatar.css"
import { useNavigate } from 'react-router-dom'

const Avatar = ({user}) => {

  const navigate = useNavigate()

  return (
    <div>
      <div onClick={() => navigate(`/single-user/${user[0]?._id}`)} className="blogHeader">
             <img className="avatar" 
                  src={user[0]?.avatar ? user[0]?.avatar : '/default-profile-image.webp'}
                  alt="User Avatar" />
               <div className="username"> {user[0]?.username}</div>
            </div>
    </div>
  )
}

export default Avatar
