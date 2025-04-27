import React, { useState } from "react";
import ads from "../../Data/AdsData";
import Advert from "./Advert";
import {useNavigate} from "react-router-dom";

export default function Adverts() {
	const [adverts] = useState(ads);
	const navigate = useNavigate()
	return (
		<div className="ads-container">
			{adverts.map((ad) => (
				<Advert
					key={ad.id}
					image={ad.image}
					adTitle={ad.title}
					location={ad.location}
					text={ad.text}
				/>
			))}
		</div>
	);
}
