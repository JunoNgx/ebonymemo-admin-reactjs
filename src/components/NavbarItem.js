import React from 'react';
import { useLocation, Link } from 'react-router-dom';


export default function NavbarItem({dest, name}) {
    const location = useLocation();
    let className = "navbar-item";
    if (location.pathname === dest) {
        className += " navbar-item-active";
    }
    return (
        <Link to={dest} className={className}>{name}</Link>
    )
}
