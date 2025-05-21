import "./modal.scss";
import Portal from "../portal/portal";
import { useRef,useState,useEffect, useContext} from "react";
import useAppoint from "../../services/Appointment";
import { CSSTransition } from "react-transition-group";
import { AppointmentContext } from "../../context/appoint/AppointContext";

interface ModalProps {
	openModal: (state:boolean)=>void;
	selectId: number;
	isOpen: boolean
}
function CancelModal({openModal,selectId,isOpen}:ModalProps) {
	const {getCancelAppoint}= useContext(AppointmentContext)
	const {cancel,canceledTrue} = useAppoint()
	const [btnDisable, setBtnDisable] = useState<boolean>(false)
	const [cancelStatus, setCancelStatus] = useState<boolean | null>(null)
	const nodRef = useRef<HTMLDivElement>(null)
	const handelCancelAppoint = (id: number) =>{
		setBtnDisable(true)
		cancel(id).then(()=>{
			setCancelStatus(true)
			
		}).catch(()=>{
			setCancelStatus(false)
		})
	}
	const closeModal = () =>{
		openModal(false)
		if(cancelStatus){
			getCancelAppoint()
		}
	}
	return (
		<Portal>
			<CSSTransition in={isOpen} timeout={{enter:500, exit:500}} unmountOnExit className='modal' nodeRef={nodRef}>
				<div className="modal" ref={nodRef}>
					<div className="modal__body">
						<span className="modal__title">
							Are you sure you want to delete the appointment? {selectId}
						</span>
						<div className="modal__btns">
							<button className="modal__ok" disabled={btnDisable} onClick={()=>handelCancelAppoint(selectId)}>Ok</button>
							<button className="modal__close" onClick={()=>closeModal()}>Close</button>
						</div>
						<div className="modal__status">{cancelStatus === null ? '' : cancelStatus ? 'Done': 'Error'}</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;
