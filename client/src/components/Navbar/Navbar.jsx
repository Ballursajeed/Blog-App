import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/Navbar.css"; // Make sure to create a Navbar.css file for styling
import axios from 'axios';
import { SERVER } from '../../constants/constants';


const Navbar = () => {

    const navigate = useNavigate()

    const logoutHandler = async(e) => {
        e.preventDefault();
      try {
         const res = await axios.post(`${SERVER}/user/logout`,  {},
            { withCredentials: true });
         console.log(res.data);
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
        <Link to="/">MyBlog</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/blog">Blogs</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <button onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
