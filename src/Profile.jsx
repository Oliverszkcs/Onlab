import React, { useState, useEffect } from "react";
import "./profile.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Advert from "./Components/Adverts/Advert";
import "./css/advert.css";

const Profile = () => {
    const [pictureName, setPictureName] = useState(null);
    const [listings, setListings] = useState([]);

    const token = sessionStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const username = decodedToken.preferred_username || decodedToken.sub;
    const email = decodedToken.email || "No email available";

    useEffect(() => {
        fetchPictures();
        fetchListings();
    },[] );

    const fetchPictures = async () => {
        try {
            axios.post(`http://localhost:8082/users/getPictures/${email}`)
                .then((response) => {
                    setPictureName(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching image", error);
                });
        } catch (error) {
            console.error("Error fetching image", error);
        }
    };

    const fetchListings = async () => {
        try {
            const response = await axios.get(`http://localhost:8082/listings/getByEmail/${email}`);
            setListings(response.data);
            console.log("Fetched listings:", response.data);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-picture">
                    {pictureName ? (
                        <img
                            src={`http://localhost:9000/pictures/${pictureName}`}
                            alt="Profile"
                            className="profile-image"
                        />
                    ) : (
                        <i className="fa fa-user"></i>
                    )}
                </div>
                <div className="profile-info">
                    <h2>{username}</h2>
                    <p>{email}</p>
                    <button
                        className="logout-btn"
                        onClick={() => {
                            sessionStorage.removeItem("token");
                            window.location.href = "/";
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className="profile-listings">
                <h3>My Listings</h3>
                <div className="listing-container">
                    {listings.map((listing) => (
                        <Advert
                            key={listing.id}
                            image={`http://localhost:9000/pictures/${listing.images[0]?.url}`}
                            location={listing.property.location}
                            adTitle={listing.property.name}
                            text={`
                                Offers: ${listing.offers.length}
                                \nPrice: ${listing.targetPrice} 
                                Bedrooms: ${listing.property.bedroomNumber} 
                                Bathrooms: ${listing.property.bathroomNumber}
                            `}
                            navigationPoint={`/property/${listing.id}`}
                        >
                        </Advert>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
