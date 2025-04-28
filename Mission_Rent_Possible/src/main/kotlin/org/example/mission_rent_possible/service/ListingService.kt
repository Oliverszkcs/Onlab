package org.example.mission_rent_possible.service

import org.example.mission_rent_possible.model.Listing
import org.example.mission_rent_possible.model.User
import org.example.mission_rent_possible.model.propertyType
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

    fun getFilteredListings(
        city: String?,
        price: Double?,
        bedrooms: Int?,
        bathrooms: Int?,
        minimumArea: Int?,
        furnished: Boolean?,
        type: propertyType?
    ): List<Listing> {
        return listingRepo.findAllFilteredListings(
            city, price, bedrooms, bathrooms, minimumArea, furnished, type
        )
    }

    fun getListingBylistingOwner(user: User): List<Listing> {
        return listingRepo.findBylistingOwner(user)
    }

    fun getListingCount(): Long {
        return listingRepo.count()
    }

}