import React from 'react';
import NavbarItem from './NavbarItem';

export default function Navbar() {
    return (
        <div className="navbar">
            <NavbarItem dest={"/"} name={"Home"}/>
            <NavbarItem dest={"/developers"} name={"Developers"}/>
            <NavbarItem dest={"/games"} name={"Games"}/>
            <NavbarItem dest={"/about"} name={"About"}/>
            {/* <Link to="/" className="navbar-item">Home</Link>
            <Link to="/developers" className="navbar-item">Developers</Link>
            <Link to="/games" className="navbar-item">Games</Link>
            <Link to="/about" className="navbar-item">About</Link> */}
        </div>
    )
}
