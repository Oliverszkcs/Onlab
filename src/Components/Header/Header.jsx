import React, {useState} from "react";
import landingImage from "../../img/landing.jpg";
import axios from "axios";

export default function Header() {
	const [searchText, setSearchText] = useState("");

	const handleSearch = async () => {
		try {
			await saveSearch();
			let requestText = "Extract property search parameters from the text and return them as a JSON object with the following keys if mentioned:\n" +
				"- type (Apartment, House, Studio, Villa, Garage)\n" +
				"- bedroom_number (Integer)\n" +
				"- bathroom_number (Integer)\n" +
				"- minimum_area (Integer)\n" +
				"- furnished (True or False)\n" +
				"- location (city name)\n" +
				"Ignore transaction type and price. Only return a JSON object. Do not include SQL or explanations.\n\n" +
				"Text:";


			const response = await axios.post("http://localhost:11434/api/generate", {
				model: "qwen2:0.5b",
				prompt: requestText + searchText,
				stream: false,
			});
			let cleanResponse = response.data.response;
			let cleanedResponse = cleanResponse.trim();
			console.log(cleanedResponse);

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
