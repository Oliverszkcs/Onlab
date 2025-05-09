import React, { useState } from "react";
import ads from "../../Data/AdsData";
import Advert from "./Advert";

export default function Adverts(navPoint) {
	const [adverts] = useState(ads);
	return (
		<div className="ads-container" id="Adverts">
			{adverts.map((ad) => (
				<Advert
					key={ad.id}
					image={ad.image}
					adTitle={ad.title}
					location={ad.location}
					text={ad.text}
					navigationPoint={"/browse"}
				/>
			))}
		</div>
	);
}
