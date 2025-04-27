import React, {useState} from "react";
import landingImage from "../../img/landing.jpg";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../../css/header.css";

export default function Header() {
	const [searchText, setSearchText] = useState("");
	const navigate = useNavigate();

	const handleSearch = async () => {
		try {
			await saveSearch();
			const requestText = `Extract the property search parameters from the given text and return them as a JSON object with the following keys. If a key is not mentioned, set it to its default value. Only return the JSON object, no random values, explanations, or SQL code.

price: Number (no symbols).

type: One of (Apartment, House, Studio, Villa, Garage). Default: 'Apartment'.

bedroom_number: Integer.NOt mentioned ? Default: 0.

bathroom_number: Integer. NOt mentioned ? Default: 0.

minimum_area: Integer (in square meters).NOt mentioned ? Default: 0. 

furnished: Boolean (True or False). Default: False.

location: City or address (e.g., Budapest, Debrecen). Location usually follows "in" or similar words and starts with a capital letter.`


			const response = await axios.post("http://localhost:11434/api/generate", {
				model: "qwen2:0.5b",
				prompt: requestText + searchText,
				stream: false,
			});

			let cleanedResponse = response.data.response.trim();
			console.log(cleanedResponse);
			let searchParams = JSON.parse(cleanedResponse);
			await perfomFilteredSearch(searchParams);

		} catch (error) {
			console.error("Error during API call:", error);
		}
	};

	const saveSearch = async () => {
		try {
			await axios.post("http://localhost:8082/search/save", {
				searchValue: searchText.toString(),
			});
		} catch (error) {
			console.error("Error saving search:", error);
		}
	};

	const perfomFilteredSearch = async (searchParams) => {
		try {
			const response = await axios.get("http://localhost:8082/listings/getAll/search", {
				params: {
					city: searchParams.location,
					price: searchParams.price,
					bedrooms: searchParams.bedroom_number,
					bathrooms: searchParams.bathroom_number,
					minimumArea: searchParams.minimum_area,
					furnished: searchParams.furnished,
					type: searchParams.type,
				},
			});
			navigate("/browse", { state: { listings: response.data } });
			console.log(response.data)
		} catch (error) {
			console.error("Error during filtered search:", error);
		}
	};



	return (
		<>
			<div className="header" id="header">
				<div className="landing-text">
					<div className="cta">
						<p>Find Your New Modern Apartment</p>
					</div>
					<div className="search-bar">
						<input
							type="text"
							placeholder="Search Location"
							value={searchText}
							onInput={(e) => setSearchText(e.target.value)}
						/>
						<button onClick={handleSearch}>Search</button>
					</div>
				</div>
				<div className="landing-image">
					<img src={landingImage} alt="" />
				</div>
				<div className="contact-info">
					<div className="phone">
						<p>
							<i class="fa fa-phone" aria-hidden="true"></i>{" "}
							<span>(+254)7 2496 6748</span>
						</p>
					</div>
					<div>
						<p>
							<i class="fa fa-map-marker" aria-hidden="true"></i>{" "}
							<span>Nairobi, Kenya</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
