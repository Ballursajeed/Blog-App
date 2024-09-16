import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css"; // Make sure to create a Navbar.css file for styling
import axios from 'axios';
import { SERVER } from '../constants/constants';
import { useSelector } from 'react-redux';


const Navbar = () => {

    const navigate = useNavigate()

    const auth = useSelector((state) => state.auth);
    console.log("Auth: ",auth.user);    

    const logoutHandler = async(e) => {
        e.preventDefault();
      try {
         const res = await axios.post(`${SERVER}/user/logout`,  {},
            { withCredentials: true });
           
            if (res.data.status === 200) {
              navigate("/login")
            }
        
      } catch (error) {
        console.log(error);
        
      }
       
    }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link >BLOGY</Link>
      </div>
      <ul className="nav-links">
      <li>
          <Link to="/home">
           <button className='btn'> Home </button>
          </Link>
        </li>
        <li>
          <Link to="/post-blog">
           <button className='btn'> Create a Blog </button>
          </Link>
        </li>
    
        <li>
          <Link to="/my-blogs">
           <button className='btn'>My Blogs</button>
          </Link>
        </li>
        
        <li>
          <button className='btn' onClick={logoutHandler}>Logout</button>
        </li>
        <li>
          <Link to="/profile">
           <button className='avatar'>Profile</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
