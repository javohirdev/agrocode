import React from 'react';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <div className='navbar'>
            <a><img className='navbar-brand' src={logo} alt="agrocode" /></a>
            <Link to="/login">
                <button className='login-button'>Sign In</button>
            </Link>
        </div>
    );
};

export default Navbar;