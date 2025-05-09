import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import formatCurrency from "../../utils";
import "../../css/propertyDetail.css";
import { jwtDecode } from "jwt-decode";
import Advert from "../Adverts/Advert";
import OfferPopup from "../Offers/OfferPopup";
import OffersListPopup from "../Offers/OfferListPopup";

export default function PropertyDetail() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [offerAmount, setOfferAmount] = useState(0.0);
    const navigate = useNavigate();
    const [userid, setUserId] = useState(null);
    const token = sessionStorage.getItem("token") || null;
    const [offers, setOffers] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [showOffers, setShowOffers] = useState(false);

    let email = null;
    if (token) {
        const decodedToken = jwtDecode(token);
        email = decodedToken.email;
    }

    const getOwner = () => {
        if (email === property?.owner?.email) {
            setIsOwner(true);
        }
    };

    useEffect(() => {
        fetchProperty();
        getUserId();
    }, []);

    useEffect(() => {
        if (property) {
            getOwner();
        }
    }, [property]);

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
    };

    const fetchOffers = async () => {
        try {
            const response = await axios.get(`http://localhost:8082/offers/getByListing/${id}`);
            setOffers(response.data);
            console.log("Offers:", response.data);
        } catch (error) {
            console.error("Error fetching offers:", error);
        }
    };

    const createOffer = async (e) => {
        e.preventDefault();
        console.log("Creating offer with amount:", offerAmount);
        if (!userid) {
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
            });
            console.log("Offer created:", response.data);
            setShowPopUp(false);
        } catch (error) {
            console.error("Error creating offer:", error);
        }
    };

    const handleMakeOffer = () => {
        setShowPopUp(true);
    };

    const handleShowOffers = async () => {
        await fetchOffers();
        setShowOffers(true);
    };

    if (!property) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading property details...</p>
            </div>
        );
    }

    return (
        <div className="property-detail-card">
            <div className="property-header">
                <h2>{property.property.name}</h2>
                <p className="price">{formatCurrency(property.targetPrice)}</p>
            </div>

            <Advert
                image={`http://localhost:9000/pictures/${property.images[0]?.url}`}
                location={property.property.location}
                adTitle={property.property.name}
                text={`Price: ${formatCurrency(property.targetPrice)} | Bedrooms: ${property.property.bedroomNumber} | Bathrooms: ${property.property.bathroomNumber}`}
                onClick={() => console.log("Already on this property")}
            />

            <div className="make-offer-container">
                {isOwner && token && (
                    <button className="make-offer-btn" onClick={handleMakeOffer}>
                        Make an Offer
                    </button>
                )}
                {!isOwner && token && (
                    <button className="make-offer-btn" onClick={handleShowOffers}>
                        Respond to offer(s).
                    </button>
                )}
            </div>


            {showPopUp && (
                <OfferPopup
                    offerAmount={offerAmount}
                    setOfferAmount={setOfferAmount}
                    onSubmit={createOffer}
                    onClose={() => setShowPopUp(false)}
                />
            )}

            {showOffers && (
                <OffersListPopup
                    offers={offers}
                    onClose={() => setShowOffers(false)}
                />
            )}
        </div>
    );
}
