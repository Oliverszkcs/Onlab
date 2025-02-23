package org.example.mission_rent_possible.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity(name = "user")
public class User {
   @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public var id: Int? = null

    private var name: String? = null
    private var email: String? = null
    private var password: String? = null

    public constructor() {}

    public constructor(name: String?, email: String?, password: String?) {
        this.name = name
        this.email = email
        this.password = password
    }

    public fun getName(): String? {
        return name
    }

    public fun setName(name: String?) {
        this.name = name
    }

    public fun getEmail(): String? {
        return email
    }

    public fun setEmail(email: String?) {
        this.email = email
    }

    public fun getPassword(): String? {
        return password
    }

    public fun setPassword(password: String?) {
        this.password = password
    }

    override fun toString(): String {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}'
    }

}

