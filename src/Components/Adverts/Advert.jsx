import {useNavigate} from "react-router-dom";
import "../../css/advert.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


export default function Advert({ images, location, adTitle, text ,navigationPoint}) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(navigationPoint);
		console.log("navigationPoint", navigationPoint);
	};
	const imageArray = Array.isArray(images)
		? images
		: images
			? [images]
			: [];


	return (
		<div className="advert" onClick={handleClick} style={{ cursor: "pointer" }}>
			<div className="adImage">
				<Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows>
					{imageArray.map((img, index) => (
						<div key={index}>
							<img src={img} alt={`${adTitle} ${index + 1}`} />
						</div>
					))}
				</Carousel>
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
