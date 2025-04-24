package org.example.mission_rent_possible.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import org.bouncycastle.asn1.x500.style.RFC4519Style.title
import java.sql.Timestamp

@Entity(name = "listing")
class Listing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null

    private var description: String? = null
    private var targetPrice: Float? = null
    private var createdAt: Timestamp? = Timestamp(System.currentTimeMillis())

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    var listingOwner: User? = null


    @JsonIgnore
    @OneToMany(mappedBy = "listing", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    var pictures: MutableList<Picture> = mutableListOf()

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "property_id", nullable = false, unique = true)
    var property: Property? = null

    @JsonIgnore
    @OneToMany(mappedBy = "listing", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    var offers: MutableList<Offer> = mutableListOf()

    constructor()

    constructor(description: String?, targetPrice: Float?, owner: User?, property: Property?) {
        this.description = description
        this.targetPrice = targetPrice
        this.listingOwner = owner
        this.property = property
    }



    fun getDescription(): String? = description
    fun getTargetPrice(): Float? = targetPrice
    fun getCreatedAt(): Timestamp? = createdAt
    fun getImages(): MutableList<Picture> = pictures



    override fun toString(): String {
        return "Listing{id=$id, title='$title', description='$description', targetPrice=$targetPrice}"
    }
}
