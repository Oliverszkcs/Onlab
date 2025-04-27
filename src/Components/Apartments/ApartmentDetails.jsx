import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import formatCurrency from "../../utils";
import "../../css/propertyDetail.css";
import {jwtDecode} from "jwt-decode";

export default function PropertyDetail() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [offerAmount, setOfferAmount] = useState(0.0);
    const navigate = useNavigate();
    const [userid, setUserId] = useState(null);
    const token= sessionStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const email = decodedToken.email;

    useEffect(() => {
        fetchProperty();
        setShowPopUp(false);
        getUserId();
    }, []);

    const fetchProperty = async () => {
        try {
            const response = await axios.get(`http://localhost:8082/listings/getById/${id}`);
            setProperty(response.data);
            console.log("Property details:", response.data);
        } catch (error) {
            console.error("Error fetching property details:", error);
        }
    };


    const getUserId = async () => {
        try {
            const response = await axios.get(`http://localhost:8082/users/getIdByEmail/${email}`);
            setUserId(response.data);
            console.log("User ID:", response.data);
        } catch (error) {
            console.error("Error fetching user ID:", error);
        }
    }

    const createOffer = async () => {
        console.log("Creating offer with amount:", offerAmount);
        if(!userid){
            navigate("/login");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8082/offers/save', null, {
                params: {
                    offeredPrice: offerAmount,
                    listingId: id,
                    buyerId: userid,
                }
            })
            console.log("Offer created:", response.data);
        } catch (error) {
            console.error("Error creating offer:", error);}
    };

    if (!property) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading property details...</p>
            </div>
        );
    }

    const handleMakeOffer = () => {
        console.log("Make an offer button clicked");
        setShowPopUp(true);
    };

    return (
        <div className="property-detail-card">
            <div className="property-header">
                <h2>{property.property.name}</h2>
                <p className="price">{formatCurrency(property.targetPrice)}</p>
            </div>
            <div className="property-image-container">
                <img
                    src={`http://localhost:9000/pictures/${property.images[0]?.url}`}
                    alt={property.property.name}
                    className="property-detail-image"
                />
            </div>
            <div className="property-description">
                <p><strong>Description:</strong> {property.description}</p>
                <p><strong>Location:</strong> {property.property.location}</p>
                <p><strong>Bedrooms:</strong> {property.property.bedroomNumber}</p>
                <p><strong>Bathrooms:</strong> {property.property.bathroomNumber}</p>
                <p><strong>Base Area:</strong> {property.property.minimumArea} m²</p>
                <p><strong>Furnished:</strong> {property.property.furnished ? "Yes" : "No"}</p>
                <p><strong>Property Type:</strong> {property.property.type}</p>
            </div>
            <div className="make-offer-container">
                <button className="make-offer-btn" onClick={handleMakeOffer}>
                    Make an Offer
                </button>
            </div>
            {showPopUp && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Make Your Offer</h3>
                        <form onSubmit={createOffer}>
                            <div className="form-group">
                                <label>Offer Amount</label>
                                <input
                                    type="number"
                                    value={offerAmount}
                                    onChange={(e) => setOfferAmount(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="make-offer-btn" >Submit Offer</button>
                            <button className="close-popup-btn" onClick={() => setShowPopUp(false)}>Close</button>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
}
