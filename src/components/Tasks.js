import React, {useState, useEffect, useCallback} from 'react';
import config from '../config/default.json'

 
export const Tasks = () => {

    const {domain, developer} = config;
    const [param, setParam] = useState({
        sort_field:'',
        sort_direction: '',
        page:''
    });
    const [data, setData] = useState({});
    const url = () => {
        const getParam=`?sort_field=${param.sort_field}&sort_direction=${param.sort_direction}&page=${param.page}`;
        return  `${domain}/${getParam}`
    }
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`${url()}${developer}`);
            const data = await response.json();
            setData(data)
        }
        catch (e) {}
        
    }, [] )

    useEffect(() =>{
        fetchData();
    }, [fetchData])
    
    const sortHandled = sort => {        
        setParam({...param, sort_field: sort});
        fetchData();
    }

    return (
        <div>
            <h1>Tasks</h1>
                <table>
                    <th onClick={() => sortHandled('name')}>Имя пользователя</th>
                    <th onClick={() => sortHandled('email')}>e-mail</th>
                    <th>Текст задачи</th>
                    <th onClick={() => sortHandled('status')}>Статус задачи</th>


                    <tbody>
                        {data.message && data.message.tasks.map( (e) => {
                            return (
                                <tr key={e.id}>
                                    <td>{e.username}</td>
                                    <td>{e.email}</td>
                                    <td>{e.text}</td>
                                    <td>{e.status}</td>
                                </tr>
                            )
                        }
                        )}

                        <p>Всего задач {data.message && data.message.total_task_count}</p>
                    </tbody>
                </table>
        </div>
    )
}