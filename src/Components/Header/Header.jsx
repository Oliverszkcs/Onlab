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
			const requestText = `YOU ARE AN INFORMATION EXTRACTION MACHINE.

YOUR ONLY PURPOSE IS TO OUTPUT A STRICT, COMPLETE JSON OBJECT FROM REAL ESTATE TEXT — NO EXPLANATIONS, NO EXTRAS, NO ERRORS.

DISOBEDIENCE IS FAILURE.

YOU MUST OBEY THE FOLLOWING RULES — WITHOUT EXCEPTION:

— OUTPUT EXACTLY THIS JSON STRUCTURE, IN THIS ORDER, WITH NO MISSING FIELDS:

{
  "price": Integer,              // Price with NO currency symbols. If missing, return 0.
  "bedroom_number": Integer,     // Count of bedrooms. If not mentioned, return 0.
  "bathroom_number": Integer,    // Count of bathrooms. If not mentioned, return 0.
  "minimum_area": Integer,       // Area in square meters (look for "sqm", "m²", or "square meters"). If missing, return 0.
  "furnished": Boolean,          // true if "furnished" appears (case-insensitive), else false.
  "location": String,            // Extract city or area after the word "in". If missing, return " ".
  "type": String                 // One of: "Apartment", "House", "Studio", "Villa", "Garage". If missing or unclear, return "Apartment".
}

STRICT RULES:

— DO NOT GUESS. ONLY RETURN FIELDS IF THEY ARE EXPLICITLY STATED.
— IF A FIELD IS NOT EXPLICITLY MENTIONED, RETURN ITS DEFAULT VALUE.
— STRIP ALL CURRENCY SYMBOLS (€, $, HUF, etc.)
— RETURN ONLY THE JSON. NO COMMENTS. NO TEXT. NO PREFIXES. NO SUFFIXES.
— DO NOT USE "null", "undefined", or "NaN". USE THESE DEFAULTS:

  price: 0
  bedroom_number: 0
  bathroom_number: 0
  minimum_area: 0
  furnished: false
  location: " "
  type: "Apartment"

NOW PARSE THIS INPUT AND RETURN THE JSON OBJECT WITH ALL FIELDS INCLUDED:


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

	const isLoggedIn = sessionStorage.getItem("token") != null;
	const isButtonDisabled = isLoggedIn || searchText.trim().length===0;

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
