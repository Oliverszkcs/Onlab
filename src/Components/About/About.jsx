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
				<p className="heading">About</p>
				<p>
					Finding the right property can be a challenging and time-consuming process, whether you're looking to buy or rent. Our platform aims to simplify this search by bringing together a wide range of properties in one place. Developed as part of my school project, this web app provides an easy-to-use solution for both property seekers and owners, making it easier than ever to find, list, and manage properties for sale or rent.


				</p>
				<br />
				<p>
					Our company's statistics page provides valuable insights into the performance and activity of our property sales and rental platform. As part of my school project, I, Szakács Olivér, am developing a web app that allows users to easily browse and manage property listings for buying and renting. The app offers a seamless experience for both property owners and potential tenants or buyers.
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
