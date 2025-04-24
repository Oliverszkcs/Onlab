package org.example.mission_rent_possible.controller.databasecontrollers

import org.example.mission_rent_possible.model.Property
import org.example.mission_rent_possible.service.PropertyService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/properties")
@CrossOrigin(origins = ["http://localhost:3000"])
class PropertyController(private val propertyService: PropertyService) {

    @GetMapping("/getById/{id}")
    fun getPropertyById(@PathVariable id: Long) {
        propertyService.getPropertyById(id)
    }
    @PostMapping("/save")
    fun saveProperty(property: Property) {
        propertyService.saveProperty(property)
    }

    @GetMapping("/getAll")
    fun getAllProperties(): List<Property> {
        return propertyService.getAllProperties()
    }

    @DeleteMapping("/{id}")
    fun deletePropertyById(id: Long) {
        propertyService.deletePropertyById(id)
    }

    @PutMapping("/{id}")
    fun updateProperty(property: Property) {
        propertyService.updateProperty(property)
    }
}