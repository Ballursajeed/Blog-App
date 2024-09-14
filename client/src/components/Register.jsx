import React, { useState } from 'react'
import "../styles/Register.css";
import axios from "axios";
import { SERVER } from '../constants/constants';

const Register = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [file, setFile] = useState()

    const submitHandler = async(e) => {
       try {
         e.preventDefault()
         const formData = new FormData();
         formData.append("email",email)
         formData.append("username",username)
         formData.append("fullName",fullName)
         formData.append("password",password)
         
         if (file) {
            formData.append("avatar",file)
         }

         const res = await axios.post(`${SERVER}/user/register`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
         })

      console.log(res);
      
    //   console.log(res.data);
       } catch (error) {
        console.log(error);
       }
        
    }

  return (
    <div>
     <div className="container">
     
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

        <label htmlFor="password">Password:</label>
        <input type="text" 
               placeholder='Enter Password...'
               id='password' 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor='avatar'>Upload Image:</label>
        <input type="file"
               onChange={(e) => setFile(e.target.files[0])}  
                />

        <button type='submit' className='btn'>Submit</button>
      </form>

     </div>
    </div>
  )
}

export default Register
