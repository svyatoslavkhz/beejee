import React, { useState, useContext, useEffect } from 'react';
import {useHttp} from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/auth.hook';
import { useHistory, useLocation} from 'react-router-dom';
import { useMessage } from '../hooks/message.hook';

export const Edit = (props) => {

    const [data, setData] = useState({})

    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const {token} = useAuth();
    const [newText, setNewText] = useState('');
    const [checkStatus, setCheckStatus] = useState(false);
    const [statusTask, setStatusTask] = useState(0);
    const message = useMessage();
    let location = useLocation();
    const isAuthenticated = !!token;
    const history = useHistory();
    
    const fetched = async () => {
        const task = new FormData();
        task.append('token', token);
        const fetched = await request(`/edit/`, ``)
            setData(fetched)
    }

    const changeHandler = e => {
        let text = e.target.value.replace(/(<([^>]+)>)/gi, "")
        setNewText(text)
        statusNumTask();
    }
    const statusNumTask = () => {
        if (newText.trim() !=='' && checkStatus) {
            setStatusTask(11)
        } else if (newText.trim() == '' && checkStatus) { 
            setStatusTask(10)} 
          else if (newText.trim() !== '' && !checkStatus) { 
                setStatusTask(1)} 
          else setStatusTask(0)
    }

    useEffect(()=> {
        statusNumTask()
    }, [checkStatus, newText])

    const submitHandler = async () => {
           statusNumTask();
            try {
               const task = new FormData();
               if (statusTask===11 || statusTask===1) {task.append('text', newText);}
               task.append('status', statusTask);
               task.append('token', token);
               const data = await request(`${location.pathname}`, '' , 'POST', task, {})
               if (data.status==='ok') {message('Записано')}
               if (data.message.token) {history.push('/login'); message('Авторизуйтесь')}
           } catch (e) {}
    }


    const checkboxStatusTask = e => {
        checkStatus === true ? setCheckStatus(false) : setCheckStatus(true);
    }


    return (
    <div>
     {isAuthenticated && <div> <h3>Редактирование задачи</h3>
        <div className="row">
        <div className="col s7 offset-s2" style={{paddingTop:'2rem'}}>
            <div className="input-field">
                
                <input 
                    placeholder="Введите новый текст задачи" 
                    id="text" 
                    type="text"
                    name="text"
                    value={newText}
                    className="yellow-input"
                    onChange={changeHandler}
                />
                <p>
                <label>
                <input 
                    type="checkbox" 
                    onChange={checkboxStatusTask}
                />
                    <span>Выполнено</span>
                 </label>
                 </p>
                <button 
                        className="btn yellow darken-4" 
                        style={{marginRight: 10}}
                        onClick={submitHandler}
                >
                    Сохранить
                </button>
                <button 
                        className="btn yellow darken-4" 
                        style={{marginRight: 10}}
                        onClick={() => {history.goBack()}}
                >
                    Вернутся
                </button>
            </div>
        </div>
       </div>
       </div>
    }
    </div>
    )
}