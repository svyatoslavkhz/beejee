import React, { useContext } from 'react';
import {useHistory} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/auth.hook';




export const Navbar = () => {
    
    const auth = useContext(AuthContext);
    const {token} = useAuth();
    const isAuthenticated = !!token;
    const history = useHistory();

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.go(0);
    }

    const account = () => {
        if (isAuthenticated) {
            return (<li><a href="" onClick={logoutHandler}>Выйти</a></li>)
        }
        return (<li><a href="/login">Аккаунт</a></li>)
    }

    return (
        <nav>
        <div className="nav-wrapper lime darken-3">
            <a href='/' className="brand-logo">Task</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/">Главная</a></li>
            <li><a href="/create">Создать</a></li>
            {account()}
            </ul>
        </div>
        </nav>
    )
}