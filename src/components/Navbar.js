import React from 'react';
import {Link} from 'react-router-dom'


export const Navbar = () => {

    

    return (
        <nav>
        <div className="nav-wrapper lime darken-3">
            <a href='/' className="brand-logo">Task</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/create">Создать</Link></li>
            <li><Link to="/login">Аккаунт</Link></li>
            </ul>
        </div>
        </nav>
    )
}