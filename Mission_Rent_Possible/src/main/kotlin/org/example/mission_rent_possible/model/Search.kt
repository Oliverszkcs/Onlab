package org.example.mission_rent_possible.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity(name = "search")
open class Search() {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null

    @Lob
    @Column(columnDefinition = "TEXT")
    var searchValue: String? = null

    @Column(nullable = false)
    var creationTime: LocalDateTime? = LocalDateTime.now()

}