import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="navbar">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/developers" className="navbar-item">Developers</Link>
            <Link to="/games" className="navbar-item">Games</Link>
            <Link to="/about" className="navbar-item">About</Link>
        </div>
    )
}
