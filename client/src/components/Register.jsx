import React, { useState } from 'react'
import "../styles/Register.css";
import axios from "axios";
import { SERVER } from '../constants/constants';
import { loginStart, loginFailure, loginSuccess, } from '../auth/authSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [file, setFile] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

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

         console.log(res.data);
         
         if (res.data.status === 201) {

              dispatch(loginStart());

            const res = await axios.post(`${SERVER}/user/login`,{
                username,
                password
            }, { withCredentials: true });

            if (res.data.status === 200) {
              dispatch(loginSuccess({
                     user:res.data.user,
                     token: res.data.refreshToken
              }))
            }
            navigate("/home")
            console.log(res.data);
            
         }
      
       } catch (error) {
        console.log(error?.response?.data);
        dispatch(loginFailure)
       }
        
    }

  return (
    <div>
     <div className="registerContainer">
     <div className='register'>
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

          <div>
            <label htmlFor="password">Password:</label>
            <input type="text" 
                  placeholder='Enter Password...'
                  id='password' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='imageUpload'>
    <label htmlFor='avatar'>Upload Profile Image:</label>
    <label className="customFileUpload">
        <span className="uploadIcon">📁 Choose File</span> 
        <p></p>
        <input type="file" id="avatar" onChange={(e) => {
            setFile(e.target.files[0]);
            document.getElementById('fileName').textContent = e.target.files[0]?.name || "No file chosen";
        }} />
    </label>
    <span id="fileName" className="fileName">No file chosen</span>
</div>

          <button type='submit' className='btn'>Submit</button>
          <div>
            <p>Already have an Account?</p>
            <Link to="/login">Login</Link> 
          </div>
        </form>
     </div>
     </div>
    </div>
  )
}

export default Register
