import { useEffect, useState } from "react"
import Register from "./components/Register"
import { useDispatch  } from "react-redux";
import { loginSuccess } from './auth/authSlice';
import axios from "axios";
import { Route,  Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import { useNavigate } from "react-router-dom";
import Home from "./components/Home";
import { SERVER } from "./constants/constants";
import SingleBlog from "./components/SingleBlog";
import MyBlog from "./components/MyBlog";
import CreatePost from "./components/CreatePost";
import Profile from "./components/Profile";
import UpdateBlog from "./components/UpdateBlog";
import EditUser from "./components/EditUser";
import SingleUser from "./components/SingleUser";
import Navbar from "./components/Navbar";
import Loading from "./components/Loader";

function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [loading,setLoading] = useState(true);

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation()

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

  const shouldHideNavbar = location.pathname === "/login" || location.pathname === "/";

  return (
    <>
     
      { loading ? (
          <>
           <Loading />
          </>
        ) : (
          <>
         {!shouldHideNavbar && <Navbar />}
            <Routes>
              <Route path="/" element={<Register />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/home" element={<Home />}/>
              <Route path="/single-blog/:id" element={<SingleBlog />}/>
              <Route path="/my-blogs" element={<MyBlog  />}/>
              <Route path="/post-blog" element={<CreatePost />}/>
              <Route path="/profile" element={<Profile  />}/>
              <Route path="/update-blog/:id" element={<UpdateBlog  />}/>
              <Route path="/edit-profile/:id" element={<EditUser  />}/>
              <Route path="/single-user/:id" element={<SingleUser  />}/>
            </Routes>
          </>
        )
      }
      
    </>
  )
}

export default App
