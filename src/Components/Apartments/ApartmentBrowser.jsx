import React, { useEffect, useState } from "react";
import axios from "axios";
import Apartment from "./Apartment";

export default function ApartmentBrowser() {
    const [downloadedApartments, setDownloadedApartments] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8082/listings/getAll")
            .then((response) => {
                setDownloadedApartments(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching apartments:", error);
            });
    }, []);

    return (
        <div className="main-apartment" id="apartments">
            <p className="apartment-heading">
                More Than 500+ <br /> Apartments For Rent
            </p>
            <div className="apartments-container">
                <div className="apartment-list">
                    {downloadedApartments.map((apartment) => (
                        <Apartment
                            key={apartment.id}
                            image={`http://localhost:9000/pictures/${apartment.images[0].url}`}
                            title={`Apartment ${apartment.id}`}
                            price={apartment.targetPrice}
                            description={apartment.description}
                            bedrooms={apartment.bedrooms}
                            bathrooms={apartment.bathrooms}
                        />
                    ))}
                </div>
            </div>
            <div className="apartment-footer">
                <div className="search-location">
                    <input type="text" placeholder="Search Location " />
                    <button>Search</button>
                </div>
                <div className="viewButton">
                    <button className="apartment-btn">
                        View All Apartments
                    </button>
                </div>
            </div>
        </div>
    );
}
