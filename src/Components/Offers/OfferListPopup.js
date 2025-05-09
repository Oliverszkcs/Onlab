import React from "react";
import formatCurrency from "../../utils";
import axios from "axios";

export default function OffersListPopup({ offers, onClose }) {

    function handleAcceptOffer(offerId) {
        updateOfferStatus(offerId, "ACCEPTED");
    }

    function handleDeclineOffer(offerId) {
        updateOfferStatus(offerId, "DECLINED");
    }
    async function updateOfferStatus(offerId, status) {
        try {
            const response = await axios.post('http://localhost:8082/offers/saveStatusChange', null, {
                params: {
                    offerId: offerId,
                    status: status
                }
            });
            console.log("Status updated successfully", response.data);
        } catch (error) {
            console.error("Error updating offer status:", error);
        }
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>Offers</h3>
                {offers.length === 0 || offers.filter(offer => offer.status === "PENDING").length === 0 ? (
                    <p>No pending offers available.</p>
                ) : (
                    offers
                        .filter(offer => offer.status === "PENDING")
                        .map((offer) => (
                            <div key={offer.id} className="offer-item">
                                <p>Offer Amount: {formatCurrency(offer.offeredPrice)}</p>
                                <p>Status: {offer.status}</p>
                                <button className="make-offer-btn" onClick={() => handleAcceptOffer(offer.id)}>Accept Offer</button>
                                <button className="close-popup-btn"  onClick={() => handleDeclineOffer(offer.id)}>Decline Offer</button>
                            </div>
                        ))
                )}

                <button className="close-popup-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}