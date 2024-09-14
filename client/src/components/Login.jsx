import React, { useState } from 'react'
import "../styles/Register.css";
import axios from "axios";
import { SERVER } from '../constants/constants';
import { loginStart, loginFailure, loginSuccess, } from '../auth/authSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = async(e) => {
       try {
         e.preventDefault()
         
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
            
              navigate("/blog")
            console.log(res.data);
            
         
      
       } catch (error) {
        console.log(error?.response?.data);
        dispatch(loginFailure)
       }
        
    }

  return (
    <div>
     <div className="container">
     
      <form action="" method='post' onSubmit={submitHandler}>


        

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

    

        <button type='submit' className='btn'>Submit</button>
        <div>
           <p>Not Registered?</p>
           <Link to="/register">Register</Link> 
        </div>
      </form>

     </div>
    </div>
  )
}

export default Login
