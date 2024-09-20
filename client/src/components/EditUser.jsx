import React, { useState } from 'react'
import "../styles/Register.css";
import axios from "axios";
import { SERVER } from '../constants/constants';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import Loading from './Loader';

const EditUser = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false);  // Add loading state

    const navigate = useNavigate()
    const { id } = useParams()

    const submitHandler = async(e) => {
      e.preventDefault()
      setLoading(true)

       try {
         
         const res = await axios.put(`${SERVER}/user/updateUserInfo/${id}`,{
                 fullName, email, username
         },{
           withCredentials: true
         })

         toast.success('Profile Updated Successfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: true
        })

       } catch (error) {
        console.log(error?.response?.data);
        toast.error(`${error?.response?.data?.message}`,{
          position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
        })
       } finally {
        setLoading(false)
       }
    }

    const handleUploadImage = async(e) => {
      e.preventDefault()
setLoading(true)
        try {
            const formData = new FormData();
            formData.append("avatar",file)

            const res = await axios.put(`${SERVER}/user/updateAvatar/${id}`,formData,{
              withCredentials: true,
              headers: {
                'Content-Type': 'multipart/form-data',
            }
            })

            toast.success('Profile Image Updated Successfully!', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              onClose: true
            })
   
          } catch (error) {
           console.log(error?.response?.data);
           toast.error(`${error?.response?.data?.message}`,{
            position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
          })
          } finally {
            setLoading(false)
          }
    }
 
  return (
    <div>
      {
        loading ? <Loading/> : <>
        <div className="container">
       <div className="register">
       <h2>Update Account Details:</h2>
      <form action="" method='post' onSubmit={submitHandler}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" 
                placeholder='Enter Full Name...' 
                id='fullName' 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" 
                placeholder='Enter Email...' 
                id='email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" 
                placeholder='Enter Username...' 
                id='username' 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <button type='submit' className='btn'>Submit</button>
      </form>

      <div className="imageUpload">
      <label htmlFor='avatar'>Update Profile Photo:</label>
      <label className="customFileUpload">
        <span className="uploadIcon">📁 Choose File</span> 
        <p></p>
        <input type="file"
               onChange={(e) => setFile(e.target.files[0])}  
                />
                </label>
       <span id="fileName" className="fileName">No file chosen</span>
       </div> 
       <button onClick={handleUploadImage} className='img-btn'>Upload Image</button>

       </div>
     </div>
        </>
      }
     
     <ToastContainer />
    </div>
  )
}

export default EditUser
