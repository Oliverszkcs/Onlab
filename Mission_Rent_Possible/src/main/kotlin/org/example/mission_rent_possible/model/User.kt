package org.example.mission_rent_possible.model

import jakarta.persistence.*

@Entity(name = "user")
class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null

    private var name: String? = null
    private var email: String? = null
    private var pictures: String? = null
    private var password: String? = null

    fun getPassword(): String? = password

    @OneToMany(mappedBy = "owner", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    var properties: ArrayList<Property> = ArrayList()

    @OneToMany(mappedBy = "sender", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    var sentMessages: ArrayList<Message> = ArrayList()

    @OneToMany(mappedBy = "receiver", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    var receivedMessages: ArrayList<Message> = ArrayList()

    @OneToMany(mappedBy = "buyer", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    var offers: ArrayList<Offer> = ArrayList()

    @OneToMany(mappedBy = "listingOwner", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    var listings: ArrayList<Listing> = ArrayList()

    constructor()

    constructor(name: String?, email: String?, pictures: String?, properties: ArrayList<Property>) {
        this.name = name
        this.email = email
        this.pictures = pictures
        this.properties = properties
    }

    fun getName(): String? = name
    fun setName(name: String?) { this.name = name }

    fun getEmail(): String? = email
    fun setEmail(email: String?) { this.email = email }

    fun getPictures(): String? = pictures
    fun setPictures(pictures: String?) { this.pictures = pictures }

    override fun toString(): String {
        return "User{id=$id, name='$name', email='$email', pictures='$pictures', properties=$properties}"
    }
}
