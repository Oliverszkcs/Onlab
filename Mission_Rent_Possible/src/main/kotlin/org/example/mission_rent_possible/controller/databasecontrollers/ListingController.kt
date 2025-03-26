package org.example.mission_rent_possible.controller.databasecontrollers

import org.example.mission_rent_possible.model.Listing
import org.example.mission_rent_possible.service.ListingService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ListingController(private val listingService: ListingService) {

    @GetMapping("/{id}")
    fun getListingById(id: Long) {
        listingService.getListingById(id)
    }
    @PostMapping("/save")
    fun saveListing(listing: Listing) {
        listingService.saveListing(listing)
    }

    @GetMapping("/{id}")
    fun deleteListingById(id: Long) {
        listingService.deleteListingById(id)
    }

    @GetMapping("/{id}")
    fun updateListing(listing: Listing) {
        listingService.updateListing(listing)
    }

}