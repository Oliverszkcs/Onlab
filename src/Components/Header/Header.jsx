import React, { useState } from "react";
import landingImage from "../../img/landing.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/header.css";

export default function Header() {
	const [searchText, setSearchText] = useState("");
	const navigate = useNavigate();

	const handleSearch = async () => {
		try {
			await saveSearch();
			const requestText = `You are an INFORMATION EXTRACTOR. Your ONLY task is to EXTRACT structured data from natural language.

From the input text, extract the following REAL ESTATE SEARCH PARAMETERS into STRICT, VALID JSON. OUTPUT ONLY THE JSON — NO EXPLANATION, NO HEADERS, NO COMMENTS.

EXTRACT THESE FIELDS:

- "price": Integer — The cost mentioned in the text. IGNORE all currency symbols like HUF, €, $, etc. If not mentioned, return 0.

- "bedroom_number": Integer — Count how many BEDROOMS are mentioned. If not present, return 0.

- "bathroom_number": Integer — Count how many BATHROOMS are mentioned. If not present, return 0.

- "minimum_area": Integer — Area in square meters. Look for “sqm”, “square meters”, or “m²”. If missing, return 0.

- "furnished": Boolean — TRUE if the word "furnished" appears, otherwise FALSE.

- "location": String — Extract the city or area name, usually after the word "in". If no location is found, return " ".

- "type": String — One of: "Apartment", "House", "Studio", "Villa", "Garage". If not present, default to "Apartment".

EXAMPLE INPUT:

I'm looking for a furnished villa in Debrecen with 4 bedrooms, 3 bathrooms, at least 120 square meters, and the price should be around 600000 HUF.

EXPECTED OUTPUT:

{
  "price": 600000,
  "bedroom_number": 4,
  "bathroom_number": 3,
  "minimum_area": 120,
  "furnished": true,
  "location": "Debrecen",
  "type": "Villa"
}

NOW PROCESS THIS INPUT:
`;

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
			console.log(response.data);
		} catch (error) {
			console.error("Error during filtered search:", error);
		}
	};

	const isLoggedIn = sessionStorage.getItem("token") !== null;
	const isButtonDisabled = !isLoggedIn || !searchText.trim();

	return (
		<div className="header" id="header">
			<div className="landing-text">
				<div className="cta">
					<p>Find Your New Modern Apartment</p>
				</div>
				<div className="search-bar">
					<input
						type="text"
						placeholder="Enter a keyword or sentence to search for properties"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<button
						onClick={handleSearch}
						disabled={isButtonDisabled}
						style={{
							backgroundColor: isButtonDisabled ? "" : "red",
							cursor: isButtonDisabled ? "pointer" : "not-allowed",
						}}
						title={isButtonDisabled ? "Please login first" : ""}
					>
						Search
					</button>
				</div>
			</div>
			<div className="landing-image">
				<img src={landingImage} alt="" />
			</div>
		</div>
	);
}
