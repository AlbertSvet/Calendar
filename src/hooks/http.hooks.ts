
import { useState, useCallback } from "react";


interface Hd  {
    [key:string]: string
}
interface Is {
    url: string,
    method?: "GET" | "POST" | "DELET" | "PATCH",
    body?: string | null,
    headers?: Hd
}

export type LoadingStatus = 'idle' | 'Loading' | 'Error'

export const useHttp = () =>{
    const [loading, setLoading] = useState<LoadingStatus>('idle');

    const request = useCallback( 
        async ({
            url,
            method = "GET", 
            body = null, 
            headers = { "Content-Type": "application/json" },
        }:Is) =>{
            setLoading('Loading');
            try{
                let response =  await fetch(url,{
                    method: method,
                    body: body,
                    headers:headers
                })
                if(!response.ok){
                    throw new Error('Error')
                }
                const data = await response.json();
                setLoading('idle');
                return data
            }catch(e){
                setLoading('Error');
                throw e
            }
        },[]);

        return {loading, setLoading, request}
}


