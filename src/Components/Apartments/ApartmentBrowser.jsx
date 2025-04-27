import React, { useEffect, useState } from "react";
import axios from "axios";
import Apartment from "./Apartment";
import {useLocation, useNavigate} from "react-router-dom";
import "../../css/apartmentBrowser.css";

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
                        <div className={"apartment-heading"} >No properties available at the moment for these specifications.</div>
                    ) : (
                        apartments.map((apartment) => (
                            <Apartment
                                key={apartment.id}
                                id={apartment.id}
                                image={`http://localhost:9000/pictures/${apartment.images[0]?.url}`}
                                title={apartment.property.name}
                                price={apartment.targetPrice}
                                description={apartment.description}
                                location={apartment.property.location}
                                bedrooms={apartment.property.bedroomNumber}
                                bathrooms={apartment.property.bathroomNumber}
                                area={apartment.property.minimumArea}
                                furnished={apartment.property.furnished}
                                type={apartment.property.type}
                            />
                        ))
                    )}
                </div>
            </div>
            <div className="apartment-footer">
                <div className="viewButton">
                    <button className="apartment-btn" onClick={handleViewAll}>
                        View All Properties
                    </button>
                </div>
                <div className={"home-button"}>
                    <button className="apartment-btn" onClick={() => navigate("/")}>
                        Back to Home Page
                    </button>
                </div>
            </div>
        </div>
    );
}
