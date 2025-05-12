package org.example.mission_rent_possible.repository

import org.example.mission_rent_possible.model.newsLatter
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface NewsLatterRepo: JpaRepository<newsLatter, Long> {
}