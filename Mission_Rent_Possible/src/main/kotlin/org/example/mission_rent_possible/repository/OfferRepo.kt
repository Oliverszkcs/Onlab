package org.example.mission_rent_possible.repository

import org.example.mission_rent_possible.model.Offer
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface OfferRepo: JpaRepository<Offer, Long> {

}