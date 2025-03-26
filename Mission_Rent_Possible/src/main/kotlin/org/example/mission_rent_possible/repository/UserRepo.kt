package org.example.mission_rent_possible.repository

import org.example.mission_rent_possible.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(name: String?): User?
}