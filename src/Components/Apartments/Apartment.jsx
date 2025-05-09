import React from "react";
import formatCurrency from "../../utils";
import "../../css/apartment.css";
import {useNavigate} from "react-router-dom";

export default function Apartment({
									  id,
									  image,
									  title,
									  price,
									  description,
									  location,
									  bedrooms,
									  bathrooms,
									  area,
									  furnished,
									  type,
								  }) {
	const navigate = useNavigate();
	const checkOut =  () => {
		navigate(`/property/${id}`);
	}
	return (
		<div className="single-apartment">
			<div className="apartment-image">
				<img src={image} alt={title} />
			</div>
			<div className="apartment-details">
				<h4 className="title">{title}</h4>
				<p className="price">{formatCurrency(price)}</p>
				<p className="description">{description}</p>
				<div className="property-info">
					<p><strong>Location:</strong> {location || "N/A"}</p>
					<p><strong>Bedrooms:</strong> {bedrooms ?? "N/A"}</p>
					<p><strong>Bathrooms:</strong> {bathrooms ?? "N/A"}</p>
					<p><strong>Base Area:</strong> {area ? `${area} m²` : "N/A"}</p>
					<p><strong>Fully Furnished:</strong> {furnished != null ? (furnished ? "Yes" : "No") : "N/A"}</p>
					<p><strong>Property Type:</strong> {type || "N/A"}</p>
				</div>
				<button className="checkoutBtn" onClick={checkOut}>Check Out</button>
			</div>
		</div>
	);
}
