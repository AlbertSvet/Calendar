import exp from "constants";
import { useHttp } from "../hooks/http.hooks";
import { IAppoint, AtctiveAppoint } from "../shr/interfaces/appoint.interface";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const useAppoint = () =>{
    const {loading, setLoading, request} = useHttp();
    const _apiBase = 'http://localhost:3001/appointments'

    // метод получения объектов 
    const getAllAppoint = async (): Promise<IAppoint[]> =>{
        const res = await request({url:_apiBase})
        return res
    }


    // метод получения объектов без свойства "canceled"
    const deletCanceld = async () =>{
        const base = await getAllAppoint();
        const transformed:AtctiveAppoint[] = base.map((item)=>{
            return{
                id: item.id,
                date: item.date,
                name: item.name,
                service: item.service,
                phone: item.phone
            }
        })
        return transformed
    }

     // метод получения объектов  свойства "canceled" = true

     const canceledTrue = async() =>{
        const base = await getAllAppoint();
        const canceledTransform = base.filter((item)=>{
            if(item.canceled === true ){
                return true
            }else{
                return false
            }
        })
       
        return canceledTransform
     }

     const cancel = async (id: number) =>{
        return await request({
            url: `${_apiBase}/${id}`,
            method: 'PATCH',
            body: JSON.stringify({canceled: false})
        })
     }

    //  POST 
    const creatNewAppoint = async (data: IAppoint) =>{
        const id = new Date().getTime()
        data['id'] = id
        data['date'] = dayjs(data.date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm')
        return await request({
            url: _apiBase,
            method: "POST",
            body: JSON.stringify(data)
        })
    }

    return {loading, getAllAppoint,deletCanceld, canceledTrue,cancel,creatNewAppoint}
}
export default useAppoint