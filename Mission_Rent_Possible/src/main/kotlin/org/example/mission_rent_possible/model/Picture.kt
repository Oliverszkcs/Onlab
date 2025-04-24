package org.example.mission_rent_possible.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity(name = "picture")
class Picture() {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var iD: Long? = null

    var url: String? = null

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "listing_id", nullable = false)
    var listing: Listing? = null

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    var user: User? = null

    constructor(url: String?, user: User?, listing: Listing) : this() {
        this.url = url
        this.user = user
        this.listing = listing
    }



}