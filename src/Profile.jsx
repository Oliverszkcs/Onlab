import React, { useState, useEffect } from "react";
import "./profile.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Advert from "./Components/Adverts/Advert";
import "./css/advert.css";
import Navbar from "./Components/Header/Navbar";
import { useNavigate } from "react-router-dom";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Profile = () => {
    const [pictureName, setPictureName] = useState(null);
    const [listings, setListings] = useState([]);
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const username = decodedToken.preferred_username || decodedToken.sub;
    const email = decodedToken.email || "No email available";

    useEffect(() => {
        fetchPictures();
        fetchListings();
        fetchOffers();
    }, []);

    const fetchPictures = async () => {
        try {
            axios.post(`http://localhost:8082/users/getPictures/${email}`)
                .then((response) => {
                    setPictureName(response.data);
                })
                .catch(() => {
                    setPictureName("profile.png");
                });
        } catch {
            setPictureName("profile.png");
        }
    };

    const fetchOffers = async () => {
        try {
            const response = await axios.get(`http://localhost:8082/offers/getByBuyer/${email}`);
            setOffers(response.data);
        } catch {}
    };

    const fetchListings = async () => {
        try {
            const response = await axios.get(`http://localhost:8082/listings/getByEmail/${email}`);
            setListings(response.data);
        } catch {}
    };

    return (
        <div className="profile-container">
            <Navbar />
            <div className="profile-section">
                <div className="profile-picture">
                    <img
                        src={`http://localhost:9000/pictures/${pictureName}`}
                        alt="Profile"
                        className="profile-image"
                    />
                </div>
                <div className="profile-info">
                    <h2>{username}</h2>
                    <p>{email}</p>
                    <button
                        className="logout-btn"
                        onClick={() => {
                            sessionStorage.removeItem("token");
                            navigate("/");
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="profile-top">
                <div className="offers-section">
                    <h3>Offers</h3>
                    <div className="offers-list">
                        {offers.map((offer) => {
                            let icon;
                            switch (offer.status) {
                                case "PENDING":
                                    icon = <FaClock className="offer-status-icon" color="#f1c40f" />;
                                    break;
                                case "ACCEPTED":
                                    icon = <FaCheckCircle className="offer-status-icon" color="#2ecc71" />;
                                    break;
                                case "REJECTED":
                                    icon = <FaTimesCircle className="offer-status-icon" color="#e74c3c" />;
                                    break;
                                default:
                                    icon = null;
                            }

                            return (
                                <div key={offer.id} className="offer-item">
                                    {icon}
                                    <div>
                                        <p><strong>{offer.listing.property.name}</strong></p>
                                        <p>Price: {offer.offeredPrice}</p>
                                        <p>Status: {offer.status}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="listings-section">
                    <h3>My Listings</h3>
                    <div className="listing-container">
                        {listings.map((listing) => (
                            <Advert
                                key={listing.id}
                                images={`http://localhost:9000/pictures/${listing.images[0]?.url}`}
                                location={listing.property.location}
                                adTitle={listing.property.name}
                                text={`Offers: ${offers.length}
                            Price: ${listing.targetPrice}
                            Bedrooms: ${listing.property.bedroomNumber}
                            Bathrooms: ${listing.property.bathroomNumber}`}
                                navigationPoint={`/property/${listing.id}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
