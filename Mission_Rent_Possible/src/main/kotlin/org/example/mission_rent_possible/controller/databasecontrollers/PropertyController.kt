package org.example.mission_rent_possible.controller.databasecontrollers

import org.example.mission_rent_possible.model.Property
import org.example.mission_rent_possible.service.PropertyService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("properties")
class PropertyController(private val propertyService: PropertyService) {

    @GetMapping("/{id}")
    fun getPropertyById(id: Long) {
        propertyService.getPropertyById(id)
    }
    @PostMapping("/save")
    fun saveProperty(property: Property) {
        propertyService.saveProperty(property)
    }

    @GetMapping("/{id}")
    fun deletePropertyById(id: Long) {
        propertyService.deletePropertyById(id)
    }

    @GetMapping("/{id}")
    fun updateProperty(property: Property) {
        propertyService.updateProperty(property)
    }
}