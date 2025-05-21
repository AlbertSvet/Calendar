import { useState,ReactNode, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: ReactNode,
    wrapperId?: string
}
function creatElemet(wrapperId:string){
    const newElement = document.createElement('div');
    newElement.setAttribute('id', wrapperId);
    // newElement.setAttribute('class', 'modal');
    document.body.append(newElement)
    return newElement
}
function Portal({children, wrapperId = 'portal-wrapper'}:PortalProps){
    const [wrapper, setWrapper] = useState<HTMLElement | null >(null)

    useLayoutEffect(()=>{
        let elemet = document.getElementById(wrapperId)
        let flag = false

        if(!elemet){
            flag = true
            elemet = creatElemet(wrapperId)
        }

        setWrapper(elemet)

        return ()=>{
          if(flag){
            elemet?.remove()
          }
        }

    },[wrapperId])
  
    if(wrapper === null) return null

    return createPortal(children,wrapper)
}

export default Portal