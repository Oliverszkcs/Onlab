import {useNavigate} from "react-router-dom";
import "../../css/advert.css"

export default function Advert({ image, location, adTitle, text }) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/browse");
	};

	return (
		<div className="advert" onClick={handleClick} style={{ cursor: "pointer" }}>
			<div className="adImage">
				<img src={image} alt={adTitle} />
				<p className="apartment-location">
					<i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
					{location}
				</p>
			</div>
			<div className="advert-details">
				<p className="advertTitle">{adTitle}</p>
				<p className="text">{text}</p>
			</div>
		</div>
	);
}
