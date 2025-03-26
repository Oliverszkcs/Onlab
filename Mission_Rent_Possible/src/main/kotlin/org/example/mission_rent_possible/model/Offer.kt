package org.example.mission_rent_possible.model

import jakarta.persistence.*

@Entity(name = "offer")
class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null

    private var offeredPrice: Float? = null

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var status: OfferStatus? = OfferStatus.PENDING

    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    var buyer: User? = null

    @ManyToOne
    @JoinColumn(name = "listing_id", nullable = false)
    var listing: Listing? = null

    constructor()

    constructor(offeredPrice: Float?, buyer: User?, listing: Listing?) {
        this.offeredPrice = offeredPrice
        this.buyer = buyer
        this.listing = listing
    }

    fun getOfferedPrice(): Float? = offeredPrice
    fun setOfferedPrice(offeredPrice: Float?) { this.offeredPrice = offeredPrice }

    override fun toString(): String {
        return "Offer{id=$id, offeredPrice=$offeredPrice, status=$status}"
    }
}

