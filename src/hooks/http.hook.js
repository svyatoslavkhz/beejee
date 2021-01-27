import { useEffect, useCallback} from 'react'
import {useMessage} from './message.hook';
import config from '../config/default.json';




export const useHttp = () => {
    const {domain, developer} = config;
    const message = useMessage();

    const request = useCallback( async (cmd, param='', method='GET', body = null, headers = {}) => {

        try {    
            const url = `${domain}${cmd}${developer}${param}`;
            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            if (!response.ok) {
                return message(data.message || 'Подключение не удалось')
            }
            if (data.status==="error") {return message(data.message.password || data.status)}
            return data
        }
        catch (e){
            return message(e)
        }
    }, [])

    return {request}

}

