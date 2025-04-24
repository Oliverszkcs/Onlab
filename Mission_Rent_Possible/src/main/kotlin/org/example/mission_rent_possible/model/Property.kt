package org.example.mission_rent_possible.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity(name = "property")
 class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null

    var name: String? = null

    var bathroomNumber: Int? = null
    var bedroomNumber: Int? = null
    var minimumArea: Int? = null
    var furnished: Boolean? = null
    var location: String? = null
    var type: propertyType? = null


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = true)
    var owner: User? = null

    @JsonIgnore
    @OneToOne(mappedBy = "property", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    var listing: Listing? = null

    constructor()

    constructor(name: String?,owner: User?) {
        this.owner = owner
        this.name = name
    }
    constructor(name: String?, bathroomNumber: Int?, bedroomNumber: Int?, minimumArea: Int?, furnished: Boolean?, location: String?, type: propertyType?) {
        this.name = name
        this.bathroomNumber = bathroomNumber
        this.bedroomNumber = bedroomNumber
        this.minimumArea = minimumArea
        this.furnished = furnished
        this.location = location
        this.type = type
    }


    override fun toString(): String {
        return "Property{id=$id'}"
    }
}

enum class propertyType{
    APARTMENT,
    HOUSE,
    STUDIO,
    VILLA,
    LOFT,
    GARAGE,
    PARKING_SPACE,
    LAND
}
