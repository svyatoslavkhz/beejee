import React, {useState, useEffect} from 'react';


export const Auth = () => {

    const [form, setForm] = useState({
        login: '', password: ''
    })
    

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    
    const loginHandler = async() => {
        try {
        
        } catch (e) {}
    }

    const logoutHandler = () => {
        return null
    }

    useEffect (()=>{
        window.M.updateTextFields()
    }, [])

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Вход</h1>
                <div className="card light-blue lighten-1">
                    <div className="card-content white-text">
                    <span className="card-title">Авторизация</span>
                    <div>
                        <div className="input-field">
                        <input 
                            placeholder="Введите login" 
                            id="login" 
                            type="text"
                            name="login"
                            className="yellow-input"
                            value={form.login}
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
            </div>
        </div>
    )
}