import {useState, useEffect, useCallback} from 'react'
import {useMessage} from './message.hook';


export const useHttp = () => {

    const message = useMessage();
    const [error, setError] = useState(null)

    const request = useCallback( async (url, method='GET', body = null, headers = {}) => {
        try {
            if (body){
                //body = formData
                // var form = new FormData();
                // form.append("username", body.username);
                // form.append("email", body.email);
                // form.append("text", body.text);
                // body = JSON.stringify(body);
                //  body = new FormData(body)
                // /headers['mimeType'] = "multipart/form-data";
                // headers['Content-Type'] = 'multipart/form-data';
                // headers['Accept'] = "application/json";
                // headers['Content-Type'] = 'false';
                // headers['data-Type'] = 'json';
                
            }
            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            if (!response.ok) {
                console.log(data.message);
                return message(data.message || 'Подключение не удалось')
            }
            if (data.status==="error") return message(data.status)
            return data
        }
        catch (e){
            return message(e)
        }
    }, [])

    return {request}

}

