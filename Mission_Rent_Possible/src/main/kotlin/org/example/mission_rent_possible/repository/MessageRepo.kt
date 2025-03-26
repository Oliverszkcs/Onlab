package org.example.mission_rent_possible.repository

import org.example.mission_rent_possible.model.Message
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MessageRepo : JpaRepository<Message, Long> {

}