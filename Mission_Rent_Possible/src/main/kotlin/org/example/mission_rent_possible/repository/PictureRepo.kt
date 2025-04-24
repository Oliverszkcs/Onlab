package org.example.mission_rent_possible.repository

import org.example.mission_rent_possible.model.Picture
import org.example.mission_rent_possible.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PictureRepo: JpaRepository<Picture, Long> {
    fun findByUser(user: User?): List<Picture>{
        return findAll().filter { it.user == user }
    }
}