import React, {useState, useEffect, useCallback} from 'react';
import { useHttp } from '../hooks/http.hook';
import {useAuth} from '../hooks/auth.hook';

 
export const Tasks = () => {

    const {request} = useHttp();
    const [param, setParam] = useState({
        sort_field:'',
        sort_direction: '',
        page:1
    });
    const [data, setData] = useState({});
    const [pages, setPages] = useState(0);

    const {token} = useAuth();
    const isAuthenticated = !!token;

    const url = () => {
        let getParam=`&sort_field=${param.sort_field}&sort_direction=${param.sort_direction}&page=${param.page}`;
        return  `${getParam}`
    }
    const fetchData = useCallback(async () => {
        try {
            const fetched = await request(`/`, `&sort_field=${param.sort_field}&sort_direction=${param.sort_direction}&page=${param.page}`)
            setData(fetched);
            fetched.message.total_task_count ? setPages(Math.ceil(fetched.message.total_task_count/3)) : setPages(0)
        }
        catch (e) {} 

    }, [param,request] )

    useEffect(() =>{
        fetchData();
    }, [fetchData])

    let direction ='';
    const sortHandled = name => {  
        param.sort_direction === 'desc' ? direction='asc' : direction='desc';
        setParam({...param, sort_field: name, sort_direction:direction});
    }

    const changePage = num => {

        setParam({...param, page:num})
    }

    const pagesDisplay = () => {
        if (pages > 0) {
        let count = pages
        return  (<ul class="pagination">
                    {param.page > 1 && <li class="waves-effect">
                                        <a href="#" onClick={() => {changePage((param.page - 1))}}>
                                        <i class="material-icons">{'<'}</i>
                                        </a></li>}
                    <li class="active"><a href="#">{param.page}</a></li>
                    { param.page < pages && <li class="waves-effect">
                                            <a href="#" onClick={() => {changePage((param.page + 1))}}>
                                            <i class="material-icons">{'>'}</i>
                                        </a></li>}
                    </ul>
            )
        }
        return null
    }

    return (
        <div>
            <h1>Tasks</h1>
                <table className="tasks">
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
                                    <td>{e.status} 
                                        {isAuthenticated && <a href={`/edit/${e.id}`}> 🖍</a>}
                                    </td>
                                </tr>
                            )
                        }
                        )
                        }
                        {pagesDisplay()}
                        <p>Всего задач {data.message && data.message.total_task_count}</p>
                    </tbody>
                </table>
        </div>
    )
}