import React, {useState, useEffect, useContext} from 'react';
import validator from 'validator';
import {useHttp} from '../hooks/http.hook';
import { useAuth } from '../hooks/auth.hook';
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import { useHistory } from 'react-router-dom';
export const Auth = () => {

    const history = useHistory();
    const auth = useContext(AuthContext);
    const {token} = useAuth();
    const isAuthenticated = !!token;
    const message = useMessage();
    const [form, setForm] = useState({
        username: '', password: ''
    })
    const {request} = useHttp();

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    
    const loginHandler = async() => {
        if(validator.isEmpty(form.username) || validator.isEmpty(form.password)){
            return message('Все поля обязательны к заполнению');
          }
        try {
            const task = new FormData();
            task.append('username', form.username);
            task.append('password', form.password);
            const data = await request(`/login`, '' , 'POST', task, {})
            if (data.message.token) {
                auth.login(data.message.token)
                history.go(-1)
            }
            if (data.status==='error') message(data.message.password)
            if (data.message.token)message('Вы вошли в аккаунт')
        } catch (e) {}
    }

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }

    useEffect (()=>{
        window.M.updateTextFields()
    }, [])
    


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                {!isAuthenticated && <div>
                <h1>Вход</h1>
                <div className="card light-blue lighten-1">
                    <div className="card-content white-text">
                    <span className="card-title">Авторизация</span>
                    <div>
                        <div className="input-field">
                        <input 
                            placeholder="Введите логин" 
                            id="username" 
                            type="text"
                            name="username"
                            className="yellow-input"
                            value={form.username}
                            onChange={changeHandler}
                        />
                        <label htmlFor="login">Login</label>
                        </div>

                        <div className="input-field">
                        <input 
                            placeholder="Введите пароль" 
                            id="password" 
                            type="password"
                            name="password"
                            className="yellow-input"
                            value={form.password}
                            onChange={changeHandler}
                        />
                        <label htmlFor="password">Пароль</label>
                        </div>

                    </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4" 
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                        >
                            Войти
                        </button>
                    </div>
                </div>
                </div> }
                {isAuthenticated && <div className="logout">
                        <button 
                            className="btn yellow darken-4" 
                            style={{marginRight: 10}}
                            onClick={logoutHandler}
                        >
                            Выйти
                        </button>
                    </div>}
            </div>
        </div>
    )
}