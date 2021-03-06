import React, {useEffect, useState} from 'react';
import validator from 'validator';
import {useHistory} from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

export const Create = () => {

    const message = useMessage();
    const history = useHistory()
    const {request} = useHttp();
    const [form, setForm] = useState({
        username:'',
        email:'',
        text:''
    })
    
    useEffect (()=>{
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value.replace(/(<([^>]+)>)/gi, "")})
    }

   const submitHandler = async () => {
       if(validator.isEmpty(form.username) || validator.isEmpty(form.text)){
         return message('Все поля обязательны к заполнению');
       }
       if(!validator.isEmail(form.email)){
        return message('Введите E-mail');
       }
        try {
            const task = new FormData();
            task.append('username', form.username);
            task.append('email', form.email);
            task.append('text', form.text);
            const data = await request(`/create`, '' , 'POST', task, {})
            history.push(`/`)
            message('Добавлено')
        } catch (e) {}
        }

return (
    <div className="row">
        <div className="col s7 offset-s2" style={{paddingTop:'2rem'}}>
            <div className="input-field">
                 <input 
                    placeholder="Введите Ваше имя" 
                    id="name" 
                    type="text"
                    name="username"
                    value={form.username}
                    className="yellow-input"
                    onChange={changeHandler}
                />
                <label htmlFor="username">Ваше имя</label>
            </div>
            <div className="input-field">
                <input 
                    placeholder="Введите текст задачи" 
                    id="text" 
                    type="text"
                    name="email"
                    value={form.email}
                    className="yellow-input"
                    onChange={changeHandler}
                />
                <label htmlFor="email">Ваш email</label>
            </div>
            <div className="input-field">
                <input 
                    placeholder="Введите текст задачи" 
                    id="text" 
                    type="text"
                    name="text"
                    value={form.text}
                    className="yellow-input"
                    onChange={changeHandler}
                />
                <label htmlFor="text">Введите задачу</label>
                <button 
                        className="btn yellow darken-4" 
                        style={{marginRight: 10}}
                        onClick={submitHandler}
                >
                    Отправить
                </button>
            </div>
        </div>
    </div>
)
}