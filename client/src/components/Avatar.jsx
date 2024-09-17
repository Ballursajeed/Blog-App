import React from 'react'
import "../styles/Avatar.css"

const Avatar = ({user}) => {

  return (
    <div>
      <div className="blogHeader">
             <img className="avatar" 
                  src={user[0].avatar ? user[0].avatar : '/default-profile-image.webp'}
                  alt="User Avatar" />
               <div className="username"> {user[0]?.username}</div>
            </div>
    </div>
  )
}

export default Avatar
