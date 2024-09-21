import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css"; // Make sure to create a Navbar.css file for styling
import axios from 'axios';
import { SERVER } from '../constants/constants';
import { useSelector } from 'react-redux';


const Navbar = () => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const auth = useSelector((state) => state.auth);

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

    const toggleMenu = () => {
      setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
            <div className="logo">
                <Link to="/home">BLOGY</Link>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                {/* Hamburger icon */}
                <span className={`bar ${isOpen ? "open" : ""}`}></span>
                <span className={`bar ${isOpen ? "open" : ""}`}></span>
                <span className={`bar ${isOpen ? "open" : ""}`}></span>
            </div>
            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
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
                        <button className='avatar'>
                            <img src={auth.user?.avatar ? auth.user.avatar : '/default-profile-image.webp'} alt='P' />
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
  );
};

export default Navbar;
