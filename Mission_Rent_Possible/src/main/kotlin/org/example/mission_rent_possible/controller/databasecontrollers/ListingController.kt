package org.example.mission_rent_possible.controller.databasecontrollers

import org.example.mission_rent_possible.model.Listing
import org.example.mission_rent_possible.model.propertyType
import org.example.mission_rent_possible.service.ListingService
import org.springframework.web.bind.annotation.*

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/listings")
class ListingController(private val listingService: ListingService) {

    @GetMapping("/getById/{id}")
    fun getListingById(@PathVariable id: Long): Listing {
        println("ListingController.getListingById: $id")
        return listingService.getListingById(id)
    }

    @GetMapping("/getCount")
    fun getListingCount(): Long {
        return listingService.getListingCount()
    }


    @PostMapping("/save")
    fun saveListing(listing: Listing) {
        listingService.saveListing(listing)
    }

    @DeleteMapping("/{id}")
    fun deleteListingById(id: Long) {
        listingService.deleteListingById(id)
    }

    @GetMapping("/getAll")
    fun getAllListings(): List<Listing> {
        return listingService.getAllListings()
    }

    @PutMapping("/{id}")
    fun updateListing(listing: Listing) {
        listingService.updateListing(listing)
    }

    @GetMapping("getAll/search")
    fun getFilteredListings(
        @RequestParam(required = false) city: String?,
        @RequestParam(required = false) price: Double?,
        @RequestParam(required = false) bedrooms: Int?,
        @RequestParam(required = false) bathrooms: Int?,
        @RequestParam(required = false) minimumArea: Int?,
        @RequestParam(required = false) furnished: Boolean?,
        @RequestParam(required = false) type: String?
    ): List<Listing> {
        return listingService.getFilteredListings(
            city, price, bedrooms,bathrooms, minimumArea, furnished, propertyType.valueOf(type?.toUpperCase().toString())
        )
    }



}