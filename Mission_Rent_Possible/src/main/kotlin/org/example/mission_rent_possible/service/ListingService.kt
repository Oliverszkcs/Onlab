package org.example.mission_rent_possible.service

import org.example.mission_rent_possible.model.Listing
import org.example.mission_rent_possible.repository.ListingRepo
import org.springframework.stereotype.Service


@Service
class ListingService(private val listingRepo: ListingRepo) {

    fun saveListing(listing: Listing) {
        println("ListingService.saveListing")
        listingRepo.save(listing)
    }

    fun deleteListingById(id: Long) {
        listingRepo.deleteById(id)
    }

    fun getListingById(id: Long): Listing {
        return listingRepo.findById(id).orElse(null)
    }

    fun getAllListings(): List<Listing> {
        return listingRepo.findAll()
    }

    fun updateListing(listing: Listing) {
        listingRepo.save(listing)
    }

}