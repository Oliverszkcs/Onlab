package org.example.mission_rent_possible.service

import org.example.mission_rent_possible.model.Offer
import org.example.mission_rent_possible.model.OfferStatus
import org.example.mission_rent_possible.repository.OfferRepo
import org.springframework.stereotype.Service

@Service
class OfferService(private val offerRepository: OfferRepo) {

    fun saveOffer(offer: Offer) {
        offerRepository.save(offer)
    }

    fun deleteOfferById(id: Long) {
        offerRepository.deleteById(id)
    }
    fun getOfferById(id: Long): Offer? {
        return offerRepository.findById(id).orElse(null)
    }
    fun getOfferByListingOwner(ownerId: Long): List<Offer> {
        return offerRepository.findAll().filter { it.listing?.listingOwner?.id?.toLong() == ownerId }
    }
    fun getAllOffers(): List<Offer> {
        return offerRepository.findAll()
    }
    fun updateOffer(offer: Offer) {
        offerRepository.save(offer)
    }

    fun saveOfferStatusChange(offerId: Long, status: String){
        offerRepository.findById(offerId).get().status=(OfferStatus.valueOf(status))
        offerRepository.save(offerRepository.findById(offerId).get())
               }

}