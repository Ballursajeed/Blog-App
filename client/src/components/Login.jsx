import React, { useState } from 'react'
import "../styles/Register.css";
import axios from "axios";
import { SERVER } from '../constants/constants';
import { loginStart, loginFailure, loginSuccess, } from '../auth/authSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import Loading from './Loader';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);  // Add loading state


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = async(e) => {
      e.preventDefault()
      setLoading(true); 

       try {
         
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
                toast.success('LoggedIn Successfully!', {
                  position: "top-center",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  onClose: () => {
                    navigate("/home")
                  }
              })
              }
            
      
       } catch (error) {
        console.log(error?.response?.data);
        dispatch(loginFailure)
        toast.error(`${error?.response?.data?.message}`,{
          position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
        })
       }finally {
        setLoading(false);  // Stop loading after the process completes
       }
        
    }

  return (
    <div>
      {
        loading ? <Loading /> : <>
           <div className="registerContainer">
     
     <div className="register">
      <h2>Login</h2>
        <form action="" method='post' onSubmit={submitHandler}>
          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" 
                  placeholder='Enter Username...' 
                  id='username' 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
            />
          </div>

         <div>
            <label htmlFor="password">Password: </label>
            <input type="text" 
                  placeholder='Enter Password...'
                  id='password' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
            />
         </div>

      <button type='submit' className='btn'>Submit</button>
      <div>
        <p>Not Registered?</p>
        <Link to="/">Register</Link> 
      </div>
      </form>
     </div>

     </div>
        </>
      }
    
     <ToastContainer />
    </div>
  )
}

export default Login
