import { useState, useContext } from "react";
import { IAppoint } from "../../shr/interfaces/appoint.interface";
import { FormEvent, ChangeEvent } from "react";
import { AppointmentContext } from "../../context/appoint/AppointContext";
import useAppoint from "../../services/Appointment";

import "./caform.scss";

function CAForm() {
	const {getCancelAppoint} = useContext(AppointmentContext)
	const {creatNewAppoint} = useAppoint();
	const [formData, setFormData] = useState<IAppoint>({
		id: 1,
		date: "",
		name: "",				
		service: "",
		phone: "",
		canceled: true
	})
	const [creatStatus, setStatus] = useState<boolean>(false)

	const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
		e.preventDefault();
		setStatus(true)
		creatNewAppoint(formData).then(()=>{
			setStatus(false)
			setFormData({
				id: 1,
				date: "",
				name: "",				
				service: "",
				phone: "",
				canceled: true
			})
			getCancelAppoint()
		})
	}
	const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
		const {name,value} = e.target
		setFormData((prev)=>({
			...prev,
			[name]: value
		}))
	}
	return (
		<form className="caform" onSubmit={handleSubmit}>
			<div className="caform__title">Create new appointment</div>
			<label htmlFor="name">
				Name<span>*</span>
			</label>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="User name"
				required
				value={formData.name}
				onChange={handleChange}
			/>

			<label htmlFor="service">
				Service<span>*</span>
			</label>
			<input
				type="text"
				name="service"
				id="service"
				placeholder="Service name"
				required
				value={formData.service}
				onChange={handleChange}
			/>

			<label htmlFor="phone">
				Phone number<span>*</span>
			</label>
			<input
				type="tel"
				name="phone"
				id="phone"
				placeholder="+1 890 335 372"
				
				title="Format should be +1 804 944 567"
				required
				value={formData.phone}
				onChange={handleChange}
			/>

			<label htmlFor="date">
				Date<span>*</span>
			</label>
			<input
				type="text"
				name="date"
				id="date"
				placeholder="DD/MM/YYYY HH:mm"
				pattern="^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$"
				title="Format should be DD/MM/YYYY HH:mm"
				required
				value={formData.date}
				onChange={handleChange}
			/>
			<button disabled={creatStatus}>Create</button>
		</form>
	);
}

export default CAForm;
