import React, { useEffect, useState } from 'react'
import "../styles/Profile.css"
import { useSelector } from 'react-redux';
import { SERVER } from '../constants/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserBlogs from './UserBlogs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

const Profile = () => {

    const auth = useSelector((state) => state.auth);

    const [blogs,setBlogs] = useState([]);
    const navigate = useNavigate()

    const handleDelete = async() => {
      window.alert("Do you want to delete Your Account?");
      
      try {
        const res = await axios.delete(`${SERVER}/user/deleteUser/${auth.user?._id}`, {
          withCredentials: true
        });
        
        if (res.status === 200) {
          // Refresh the page after successful deletion
          toast.success('Profile Deleted Successfully!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            onClose: () => {
              setTimeout(() => { window.location.reload();},1000)
            window.location.reload();
            }
          })
          
        } else {
          console.error("Failed to delete the blog");
        }
      } catch (error) {
        console.error("Error deleting the blog:", error);
        toast.error(`${error?.response?.data?.message}`,{
          position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
        })
      }
    }

    const handleEdit = async() => {
         navigate(`/edit-profile/${auth.user?._id}`)
    } 

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

      <div className="Profile-container">
        <div className="Profile-card">
          <img src={auth.user?.avatar ? auth.user.avatar : '/default-profile-image.webp' } alt="Avatar" />
          <h2 className="Profile-fullname">{auth.user.fullName}</h2>
          <p className="Profile-username">{auth.user.username}</p>
          <p className="Profile-blog">Blog Published:{auth.user?.blogs?.length}</p>
          <button className='edit-btn' onClick={handleEdit}>edit</button>
          <button className='delete-btn' onClick={handleDelete}>delete Profile</button>
        </div>
          <div className="Profile-userblogs">
        <h2>Your Blogs:</h2>

          {
         blogs.map((blog,index) => {
          return (
            <UserBlogs blog={blog} key={index} single={false}/>
          )
        })
      }
          </div>
      </div>
     <ToastContainer />
    </>
  )
}

export default Profile
