import React from "react";

export default function OfferPopup({ offerAmount, setOfferAmount, onSubmit, onClose }) {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>Make Your Offer</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Offer Amount</label>
                        <input
                            type="number"
                            value={offerAmount}
                            onChange={(e) => setOfferAmount(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="make-offer-btn">Submit Offer</button>
                    <button type="button" className="close-popup-btn" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
}