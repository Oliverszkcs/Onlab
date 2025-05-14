package org.example.mission_rent_possible.controller.databasecontrollers

import org.example.mission_rent_possible.model.Offer
import org.example.mission_rent_possible.service.ListingService
import org.example.mission_rent_possible.service.OfferService
import org.example.mission_rent_possible.service.UserService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/offers")
@CrossOrigin(origins = ["http://localhost:3000"])
class OfferController(
    private val offerService: OfferService,
    private val listingService: ListingService,
    private val userService: UserService) {

    @GetMapping("/getById/{id}")
    fun getOfferById(@PathVariable id: Long) {
        offerService.getOfferById(id)
    }
    @PostMapping("/save")
    fun saveOffer(
        @RequestParam("offeredPrice") offeredPrice: Float,
        @RequestParam("listingId") listingId: Int,
        @RequestParam("buyerId") buyerId: Int)
    {
        println("OfferController.saveOffer: offeredPrice: $offeredPrice, listingId: $listingId, buyerId: $buyerId")
        val listing = listingService.getListingById(listingId.toLong())
        val buyer = userService.getUserById(buyerId.toLong())

        val offer = Offer(offeredPrice,buyer,listing)

        offerService.saveOffer(offer)
    }

    @PostMapping("/saveStatusChange")
    fun saveOfferStatusChange(
        @RequestParam("offerId") offerId: Long,
        @RequestParam("status") status: String
    )
    {
        offerService.saveOfferStatusChange(offerId, status)
        println("OfferController.saveOfferStatusChange: offerId: $offerId, status: $status")
    }

    @DeleteMapping("/{id}")
    fun deleteOfferById(@PathVariable id: Long) {
        offerService.deleteOfferById(id)
    }

    @PutMapping("/{id}")
    fun updateOffer(@RequestBody offer: Offer) {
        offerService.updateOffer(offer)
    }

    @GetMapping("/getByListing/{id}")
    fun getOffersByListingId(@PathVariable("id") listingId: Long): List<Offer> {
        return offerService.getOfferByListingOwner(listingId)
    }

    @GetMapping("/getByBuyer/{email}")
    fun getOfferByBuyerEmail(@PathVariable("email") buyerEmail: String): List<Offer> {
        return offerService.getOfferByBuyerEmail(buyerEmail)
    }
}