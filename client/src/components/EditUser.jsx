import React, { useState } from 'react'
import "../styles/Register.css";
import axios from "axios";
import { SERVER } from '../constants/constants';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [file, setFile] = useState()

    const navigate = useNavigate()
    const { id } = useParams()

    const submitHandler = async(e) => {
       try {
         e.preventDefault()
         
         const res = await axios.put(`${SERVER}/user/updateUserInfo/${id}`,{
                 fullName, email, username
         },{
           withCredentials: true
         })

       } catch (error) {
        console.log(error?.response?.data);
       }
    }

    const handleUploadImage = async(e) => {
        try {
            e.preventDefault()
            const formData = new FormData();
            formData.append("avatar",file)

            const res = await axios.put(`${SERVER}/user/updateAvatar/${id}`,formData,{
              withCredentials: true,
              headers: {
                'Content-Type': 'multipart/form-data',
            }
            })
   
          } catch (error) {
           console.log(error?.response?.data);
          }
    }
 
  return (
    <div>
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
    </div>
  )
}

export default EditUser
