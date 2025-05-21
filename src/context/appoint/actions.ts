import { IAppoint, AtctiveAppoint } from "../../shr/interfaces/appoint.interface"
import { LooseValue } from "react-calendar/dist/cjs/shared/types";
export enum ActionTypes {
    SET_ACTIVE_APPOINTMETS = 'SET_ACTIVE_APPOINTMETS',
    SET_ALL_APPOINTMETS ='SET_ALL_APPOINTMETS',
    SET_CANCELD_APPOINTMETS ='SET_CANCELD_APPOINTMETS',
    FETCH_APPOINTMETS = 'FETCH_APPOINTMETS',
    ERROR_APPOINTMETS = 'ERROR_APPOINTMETS',
    SET_CALENDER_DATE = ' SET_CALENDER_DATE'
}

export type IAppontActios = {
    type: ActionTypes.SET_ACTIVE_APPOINTMETS;
    paylode: AtctiveAppoint[]
} | {
    type: ActionTypes.SET_ALL_APPOINTMETS;
    paylode: IAppoint[]
}
 | {
    type: ActionTypes.SET_CANCELD_APPOINTMETS;
    paylode: IAppoint[]
}
 | {
    type: ActionTypes.FETCH_APPOINTMETS;
}
 | {
    type: ActionTypes.ERROR_APPOINTMETS;
}
| {
    type: ActionTypes.SET_CALENDER_DATE;
    paylode: LooseValue
}