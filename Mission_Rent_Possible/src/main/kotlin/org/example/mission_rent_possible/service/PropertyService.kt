package org.example.mission_rent_possible.service

import org.example.mission_rent_possible.model.Property
import org.example.mission_rent_possible.repository.PropertyRepo
import org.springframework.stereotype.Service

@Service
class PropertyService(private val propertyRepository: PropertyRepo) {
    fun saveProperty(property: Property) {
        propertyRepository.save(property)
    }

    fun getPropertyById(id: Long): Property? {
        return propertyRepository.findById(id).orElse(null)
    }

    fun getAllProperties(): List<Property> {
        return propertyRepository.findAll()
    }

    fun deletePropertyById(id: Long) {
        propertyRepository.deleteById(id)
    }


    fun updateProperty(property: Property) {
        propertyRepository.save(property)
    }

}