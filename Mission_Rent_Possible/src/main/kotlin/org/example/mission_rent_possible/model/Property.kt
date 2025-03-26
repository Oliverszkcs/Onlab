package org.example.mission_rent_possible.model

import jakarta.persistence.*

@Entity(name = "property")
class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    var owner: User? = null

    @OneToOne(mappedBy = "property", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    var listing: Listing? = null

    constructor()

    constructor(aspects: String?, location: String?, owner: User?) {
        this.owner = owner
    }

    override fun toString(): String {
        return "Property{id=$id'}"
    }
}
