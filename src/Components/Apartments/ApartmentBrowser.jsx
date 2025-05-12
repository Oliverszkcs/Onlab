import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/apatments.css";
import "../../css/apartmentBrowser.css";
import Advert from "../Adverts/Advert";

export default function ApartmentBrowser() {
    const [apartments, setApartments] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.listings) {
            setApartments(location.state.listings);
        } else {
            fetchApartments();
        }
    }, [location.state]);

    const fetchApartments = async () => {
        try {
            const response = await axios.get("http://localhost:8082/listings/getAll");
            setApartments(response.data);
        } catch (error) {
            console.error("Error fetching apartments:", error);
        }
    };

    const handleViewAll = () => {
        fetchApartments();
    };

    return (
        <div className="main-apartment" id="apartments">
            <p className="apartment-heading">
                More Than 500+ <br /> Apartments For Rent/Sale
            </p>
            <div className="apartments-container">
                <div className="apartment-list">
                    {apartments.length === 0 ? (
                        <div
                            className="apartment-heading no-properties"
                            onClick={() => navigate("/")}
                            style={{ cursor: "pointer", textDecoration: "underline" }}
                        >
                            No properties available at the moment for these specifications. (Click to return)
                        </div>
                    ) : (
                        apartments.map((apartment) => (
                            <div
                                className="apartment-item"
                                key={apartment.id}
                                onClick={() => navigate(`/property/${apartment.id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <Advert
                                    id={apartment.id}
                                    image={`http://localhost:9000/pictures/${apartment.images[0]?.url}`}
                                    adTitle={apartment.property.name}
                                    price={apartment.targetPrice}
                                    text={`
  ${apartment.description}   
  | Price: ${apartment.targetPrice}  
  | Bedrooms: ${apartment.property.bedroomNumber}  
  | Bathrooms: ${apartment.property.bathroomNumber}
`}
                                    location={apartment.property.location}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="apartment-footer">
                <div className="viewButton">
                    <button className="apartment-btn" onClick={handleViewAll}>
                        View All Properties
                    </button>
                    <button className="apartment-btn" onClick={() => navigate("/")}>
                        Back to Home Page
                    </button>
                </div>
            </div>
        </div>
    );
}
