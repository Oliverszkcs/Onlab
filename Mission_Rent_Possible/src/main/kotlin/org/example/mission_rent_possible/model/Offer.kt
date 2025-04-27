package org.example.mission_rent_possible.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity(name = "offer")
open class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null

    private var offeredPrice: Float? = null

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var status: OfferStatus? = OfferStatus.PENDING

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    var buyer: User? = null

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "listing_id", nullable = false)
    var listing: Listing? = null

    constructor()

    constructor(offeredPrice: Float?, buyer: User?, listing: Listing?) {
        this.offeredPrice = offeredPrice
        this.buyer = buyer
        this.listing = listing
        listing?.offers?.addLast(this)
        buyer?.offers?.addLast(this)
    }

    fun getOfferedPrice(): Float? = offeredPrice
    fun setOfferedPrice(offeredPrice: Float?) { this.offeredPrice = offeredPrice }

    override fun toString(): String {
        return "Offer{id=$id, offeredPrice=$offeredPrice, status=$status , buyer=$buyer, listing=$listing}"
    }
}

