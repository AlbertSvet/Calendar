import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appoint/AppointContext";
import { useEffect, useContext } from "react";

function HistoryList() {
	const {IAppoint, getAppoint} = useContext(AppointmentContext)
	useEffect(()=>{
		getAppoint()
		console.log(IAppoint)
	},[])
	return (
		<>
			{IAppoint.map(item =>{
				return	<AppointmentItem list={item} key={item.id}/>
			})}
			
		</>
	);
}

export default HistoryList;
