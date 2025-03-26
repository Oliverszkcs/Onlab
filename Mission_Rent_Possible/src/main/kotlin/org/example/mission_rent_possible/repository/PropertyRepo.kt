package org.example.mission_rent_possible.repository

import org.example.mission_rent_possible.model.Property
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PropertyRepo : JpaRepository<Property, Long> {

}