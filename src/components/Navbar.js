import React, { useContext } from 'react';
import {useHistory, Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/auth.hook';




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