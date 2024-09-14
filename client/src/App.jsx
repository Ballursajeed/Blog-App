import { useEffect, useState } from "react"
import Register from "./components/Register"
import { useDispatch  } from "react-redux";
import { loginSuccess } from './auth/authSlice';
import axios from "axios";
import { Route,  Routes } from "react-router-dom";
import Login from "./components/Login";
import { useNavigate } from "react-router-dom";
import Blog from "./components/Blog";
import { SERVER } from "./constants/constants";

function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [loading,setLoading] = useState(true);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {

    const fetchUserDetails = async () => {

          try {
              const response = await axios.get(`${SERVER}/user/me`, {
                  withCredentials: true
              });
              setIsLoggedIn(true);

              if (response.data.status === 200) {
                dispatch(loginSuccess({
                  user:response.data?.user,
                  token: response.data?.user?.refreshToken
                 }))
          navigate("/blog")

              }
             
          } catch (error) {
              console.error('Failed to fetch user details:', error);
              setIsLoggedIn(false);
              navigate("/login")
          }
    
      setLoading(false);
  };
  fetchUserDetails();
  },[])

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/blog");
    }
  }, [isLoggedIn, navigate])

  return (
    <>
      { loading ? (
          <>
           <p>Loading......</p>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Register />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/blog" element={<Blog />}/>
            </Routes>
          </>
        )
      }
    </>
  )
}

export default App
