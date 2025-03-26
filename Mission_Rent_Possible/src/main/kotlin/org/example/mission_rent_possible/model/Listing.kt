package org.example.mission_rent_possible.model

import jakarta.persistence.*
import java.sql.Timestamp

@Entity(name = "listing")
class Listing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null

    private var title: String? = null
    private var description: String? = null
    private var targetPrice: Float? = null
    private var createdAt: Timestamp? = Timestamp(System.currentTimeMillis())

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    var listingOwner: User? = null

    @OneToOne
    @JoinColumn(name = "property_id", nullable = false, unique = true)
    var property: Property? = null

    @OneToMany(mappedBy = "listing", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    var offers: ArrayList<Offer> = ArrayList()

    constructor()

    constructor(title: String?, description: String?, targetPrice: Float?, owner: User?, property: Property?) {
        this.title = title
        this.description = description
        this.targetPrice = targetPrice
        this.listingOwner = owner
        this.property = property
    }

    fun getTitle(): String? = title
    fun setTitle(title: String?) { this.title = title }

    override fun toString(): String {
        return "Listing{id=$id, title='$title', description='$description', targetPrice=$targetPrice}"
    }
}
