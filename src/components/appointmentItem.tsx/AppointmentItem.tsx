import "./appointmentItem.scss";
import { IAppoint } from "../../shr/interfaces/appoint.interface";
import { useState, useEffect, memo} from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
interface IList {
	list: IAppoint,
	handleOpenModal?: (id:number)=>void
}


const AppointmentItem = memo(({list,handleOpenModal}:IList) => {
	const {pathname} = useLocation()
	const {id, date, name,service,phone,canceled} = list
	const [timeLeft, setTimeLeft] = useState<string | null>(null);



	const formData = dayjs(date).format('DD/MM/YYYY HH:mm');
	useEffect(()=>{		
	const timer = setInterval(()=>{
			setTimeLeft(`${dayjs(date).diff(undefined, 'h')}:${dayjs(date).diff(undefined, 'm') % 60}`)
		},60000)
	return (()=>{
		clearInterval(timer)
	})
	},[])
	return (
		<div className="appointment">
			<div className="appointment__info">
				<span className="appointment__date">{formData}</span>
				<span className="appointment__name">{name}</span>
				<span className="appointment__service">{service}</span>
				<span className="appointment__phone">Phone: {phone}</span>
			</div>
			<div className="appointment__time">
				<span>Time left:</span>
				<span className="appointment__timer">{timeLeft}</span>
			</div>
			{pathname === '/historyPage' ? '' : <button className="appointment__cancel" onClick={()=>{handleOpenModal?.(id)}}>Cancel</button>}
			

			
		</div>
	);
})

export default AppointmentItem;
