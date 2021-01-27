import React, { useContext } from 'react';
import {useHistory, Link} from 'react-router-dom';
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
        return (<li><Link to="/login">Аккаунт</Link></li>)
    }

    return (
        <nav>
        <div className="nav-wrapper lime darken-3">
            <Link to='/' className="brand-logo">Task</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/create">Создать</Link></li>
            {account()}
            </ul>
        </div>
        </nav>
    )
}