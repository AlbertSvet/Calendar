import  React, { createContext, useReducer} from "react";
import reducer, { IinitState} from "./reduser";
import { ActionTypes } from "./actions";
import useAppoint from "../../services/Appointment";
import { LooseValue, Value } from "react-calendar/dist/cjs/shared/types";

const initState:IinitState = {
    IAppoint: [],
    AtctiveAppoint: [],
    ICanceldTrue: [],
    ApointmentLoadingStatus: 'idle',
    Calendar: [null, null]
}

interface ProviderInter {
    children: React.ReactNode
}
interface AppointmentContextValue extends IinitState {
    getAppoint: () => void,
    getCancelAppoint: ()=> void,
    setCalendr: (newDate:Value) => void
}
export const AppointmentContext = createContext<AppointmentContextValue>({
    IAppoint: initState.IAppoint,
    AtctiveAppoint: initState.AtctiveAppoint,
    ICanceldTrue:initState.ICanceldTrue,
    ApointmentLoadingStatus: initState.ApointmentLoadingStatus,
    Calendar : initState.Calendar,
    getAppoint: () =>{},
    getCancelAppoint: ()=> {},
    setCalendr: (newDate: Value)=>{}
   
});

export const AppointmentContextProvider = ({children}: ProviderInter) =>{
    const [state, dispatch] = useReducer(reducer, initState)

    const{loading, getAllAppoint,deletCanceld,canceledTrue} = useAppoint();
    
    const value: AppointmentContextValue = {
        IAppoint: state.IAppoint,
        AtctiveAppoint: state.AtctiveAppoint,
        ICanceldTrue: state.ICanceldTrue,
        ApointmentLoadingStatus: loading,
        Calendar : state.Calendar,
        getAppoint: () =>{
            getAllAppoint().then( data => {
                dispatch({type: ActionTypes.SET_ALL_APPOINTMETS, paylode: data})
                })
        },
        getCancelAppoint: () =>{
            canceledTrue().then(data =>{
                  const filterData = data.filter((item)=>{
                    if(Array.isArray(state.Calendar) && state.Calendar[0] && state.Calendar[1]){
                        if(new Date(item.date).getTime >= new Date(state.Calendar[0]).getTime && new Date(item.date).getTime <= new Date(state.Calendar[1]).getTime){
                            return item
                        }
                    }else{
                        return item
                    }
                })
                dispatch({type: ActionTypes.SET_CANCELD_APPOINTMETS, paylode: filterData})
            }
        )
        },
        setCalendr: (newDate: Value)=> {
            dispatch({type: ActionTypes.SET_CALENDER_DATE, paylode: newDate})
        }
       
    }

    return(
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    )
}   
