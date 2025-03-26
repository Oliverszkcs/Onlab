package org.example.mission_rent_possible.controller.databasecontrollers

import org.example.mission_rent_possible.model.Offer
import org.example.mission_rent_possible.service.OfferService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("offers")
class OfferController(private val offerService: OfferService) {

    @GetMapping("/{id}")
    fun getOfferById(id: Long) {
        offerService.getOfferById(id)
    }
    @PostMapping("/save")
    fun saveOffer(offer: Offer) {
        offerService.saveOffer(offer)
    }

    @GetMapping("/{id}")
    fun deleteOfferById(id: Long) {
        offerService.deleteOfferById(id)
    }

    @GetMapping("/{id}")
    fun updateOffer(offer: Offer) {
        offerService.updateOffer(offer)
    }
}