import React, { useContext } from 'react';
import NavbarItem from './NavbarItem';
import { AuthContext } from './AuthContext';

export default function Navbar() {
    const auth = useContext(AuthContext);

    return (
        <div className="navbar">
            <NavbarItem dest={"/"} name={"Home"}/>
            <NavbarItem dest={"/developers"} name={"Developers"}/>
            <NavbarItem dest={"/games"} name={"Games"}/>
            <NavbarItem dest={"/about"} name={"About"}/>
            
            {(auth.isAuthenticated)
                ? <>
                    <LogoutButton/>
                </>
                : ''
            }
        </div>
    )
}

function LogoutButton() {
    const auth = useContext(AuthContext);
    return (
        <span className={"navbar-item"} onClick={auth.logout}>Logout</span>
    )
}