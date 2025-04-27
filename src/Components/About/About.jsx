import {useEffect, useState} from "react";
import "../../css/about.css";

export default function About() {
	const [apartmentCount, setApartmentCount] = useState(0);
	const [userCount, setUserCount] = useState(0);

	const fetchApartmentCount = async () => {
		try {
			const response = await fetch("http://localhost:8082/listings/getCount");
			const data = await response.json();
			setApartmentCount(data);
		} catch (error) {
			console.error("Error fetching apartment count:", error);
		}
	}

	const fetchUserCount = async () => {
		try{
			const response = await fetch("http://localhost:8082/users/getCount");
			const data = await response.json();
			setUserCount(data);
		}catch (error){
			console.error("Error fetching user count:", error);
		}
	}

	useEffect(() => {
		fetchApartmentCount();
		fetchUserCount();
	}, []);


	return (
		<div className="about" id="about">
			<div className="company">
				<p className="heading">Our Company's Statistics</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Aliquam vitae nam a! Consequatur ut veniam iste, temporibus
					eveniet repudiandae quia! Animi quo expedita molestiae
					deleniti soluta in saepe beatae a est. Enim inventore itaque
					ea voluptas quibusdam dolore esse dignissimos?
				</p>
				<br />
				<p>
					{" "}
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Aliquam vitae nam a! Consequatur ut veniam iste, temporibus
					eveniet repudiandae quia! Animi quo expedita molestiae
					deleniti soluta in saepe beatae a est. Enim inventore itaque
					ea voluptas quibusdam dolore esse dignissimos?
				</p>
			</div>
			<div className="stats">
				<div className="apartments">
					<p>
						<span>{apartmentCount}</span> <br /> Properties
					</p>
				</div>
				<div className="clients">
					<p>
						<span>{userCount}</span>
						<br /> Clients
					</p>
				</div>
			</div>
		</div>
	);
}
