package org.example.mission_rent_possible.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity(name = "user")
open class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null

    private var name: String? = null
    private var email: String? = null

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    private var pictures: MutableList<Picture>? = mutableListOf()


    @OneToMany(mappedBy = "owner", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JsonIgnore
    var properties: MutableList<Property> = mutableListOf()

    @JsonIgnore
    @OneToMany(mappedBy = "sender", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    var sentMessages: MutableList<Message> = mutableListOf()

    @JsonIgnore
    @OneToMany(mappedBy = "receiver", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    var receivedMessages: MutableList<Message> = mutableListOf()

    @JsonIgnore
    @OneToMany(mappedBy = "buyer", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    var offers: MutableList<Offer> = mutableListOf()

    @JsonIgnore
    @OneToMany(mappedBy = "listingOwner", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    var listings: MutableList<Listing> = mutableListOf()


    constructor()

    constructor(name: String?, email: String?) {
        this.name = name
        this.email = email
    }

    fun getName(): String? = name
    fun setName(name: String?) { this.name = name }

    fun getEmail(): String? = email
    fun setEmail(email: String?) { this.email = email }

    fun addProperty(property: Property) { properties.addLast(property) }

    override fun toString(): String {
        return "User{id=$id, name='$name', email='$email'}"
    }
}
