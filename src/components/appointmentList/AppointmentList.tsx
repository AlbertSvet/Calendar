import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appoint/AppointContext";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";
import { useContext, useEffect,useState, useCallback} from "react";



function AppointmentList() {
	const {ICanceldTrue,getCancelAppoint,ApointmentLoadingStatus,Calendar} = useContext(AppointmentContext)
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectId, setSelectId] = useState(0)
	
	useEffect(()=>{
		getCancelAppoint()
	},[Calendar])

	const handleOpenModal = useCallback((id:number)=>{
		setIsOpen(true);
		setSelectId(id)
	},[])

	if(ApointmentLoadingStatus === 'Loading'){
		return <Spinner/>
	}else if (ApointmentLoadingStatus === 'Error'){
		return <Error/>
	}
	
	return (
		<>
		{ICanceldTrue.map(item =>{
			return <AppointmentItem list={item} key={item.id} handleOpenModal={handleOpenModal}/>
		})}
		<CancelModal openModal={setIsOpen} selectId={selectId} isOpen={isOpen}/>
		</>
	);
}

export default AppointmentList;
