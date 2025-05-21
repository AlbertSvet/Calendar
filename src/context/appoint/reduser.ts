import { IAppontActios, ActionTypes } from "./actions";
import { IAppoint, AtctiveAppoint } from "../../shr/interfaces/appoint.interface";
import { LoadingStatus } from "../../hooks/http.hooks";
import { LooseValue } from "react-calendar/dist/cjs/shared/types";


export interface IinitState {
	IAppoint: IAppoint[] | [],
	AtctiveAppoint: AtctiveAppoint[] | []
    ICanceldTrue: IAppoint[] | [],
    ApointmentLoadingStatus: LoadingStatus,
    Calendar: LooseValue
}


export default function reducer (state:IinitState, action:IAppontActios):IinitState {
    switch(action.type){
        case ActionTypes.SET_ALL_APPOINTMETS:
            return {...state, IAppoint: action.paylode,ApointmentLoadingStatus: 'idle'};
        case ActionTypes.SET_ACTIVE_APPOINTMETS:
            return {...state, AtctiveAppoint: action.paylode,ApointmentLoadingStatus: 'idle'};
        case ActionTypes.SET_CANCELD_APPOINTMETS:
            return {...state, ICanceldTrue: action.paylode,ApointmentLoadingStatus: 'idle'};
        case ActionTypes.FETCH_APPOINTMETS:
            return {...state, ApointmentLoadingStatus: 'Loading' };
        case ActionTypes.ERROR_APPOINTMETS:
            return {...state, ApointmentLoadingStatus: 'Error' };
        case ActionTypes.SET_CALENDER_DATE: 
            return {...state, Calendar: action.paylode}
        default:
            return state
    }
}