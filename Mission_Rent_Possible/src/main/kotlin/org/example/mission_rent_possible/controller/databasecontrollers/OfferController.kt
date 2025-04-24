package org.example.mission_rent_possible.controller.databasecontrollers

import org.example.mission_rent_possible.model.Offer
import org.example.mission_rent_possible.service.OfferService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/offers")
@CrossOrigin(origins = ["http://localhost:3000"])
class OfferController(private val offerService: OfferService) {

    @GetMapping("/getById/{id}")
    fun getOfferById(@PathVariable id: Long) {
        offerService.getOfferById(id)
    }
    @PostMapping("/save")
    fun saveOffer(offer: Offer) {
        offerService.saveOffer(offer)
    }

    @DeleteMapping("/{id}")
    fun deleteOfferById(id: Long) {
        offerService.deleteOfferById(id)
    }

    @PutMapping("/{id}")
    fun updateOffer(offer: Offer) {
        offerService.updateOffer(offer)
    }
}