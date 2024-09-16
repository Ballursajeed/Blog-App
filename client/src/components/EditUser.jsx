import React, { useState } from 'react'
import "../styles/Register.css";
import axios from "axios";
import { SERVER } from '../constants/constants';
import { useDispatch } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

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

         console.log("update res: ",res.data);
        
      
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
   
            console.log("update avatar: ",res.data);
          
          } catch (error) {
           console.log(error?.response?.data);
          }
        console.log();
        
    }
 
  return (
    <div>
        <Navbar />
     <div className="container">
     <h2>Update Account Details:</h2>
      <form action="" method='post' onSubmit={submitHandler}>
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" 
               placeholder='Enter Full Name...' 
               id='fullName' 
               value={fullName}
               onChange={(e) => setFullName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input type="text" 
               placeholder='Enter Email...' 
               id='email' 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="username">Username:</label>
        <input type="text" 
               placeholder='Enter Username...' 
               id='username' 
               value={username}
               onChange={(e) => setUsername(e.target.value)}
        />


       

        <button type='submit' className='btn'>Submit</button>
      </form>

      <label htmlFor='avatar'>Update Profile Photo:</label>
        <input type="file"
               onChange={(e) => setFile(e.target.files[0])}  
                />
       <button onClick={handleUploadImage}>Upload Image</button>         

     </div>
    </div>
  )
}

export default EditUser
