package org.example.mission_rent_possible.controller.databasecontrollers

import org.example.mission_rent_possible.model.User
import org.example.mission_rent_possible.model.propertyType
import org.example.mission_rent_possible.service.UserService
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile


@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/users")
class UserController(private val userService: UserService ) {

    @PostMapping("/save")
    fun saveUser(@RequestBody user: User): String {
        userService.saveUser(user)
        return "User saved successfully"
    }

    @GetMapping("/getAll")
    fun getAllUsers(): List<User> {
        return userService.getAllUsers()
    }

    @DeleteMapping("/{id}")
    fun deleteUserById(@PathVariable id: Long) {
        userService.deleteUserById(id)
    }


    @PostMapping("/get")
    fun getUserByEmail(@RequestBody email: String): User? {
        return userService.getUserByEmail(email)
    }

    @GetMapping("/getById/{id}")
    fun getUserById(@PathVariable id: Long): User? {
        return userService.getUserById(id)
    }

    @PostMapping("/getPictures/{email}")
    fun getUserPictures(@PathVariable email: String): String? {
        return userService.getUserProfilePic(email)
    }

    @PostMapping("/updatePictures")
    fun updateUserPictures(@RequestParam email: String, @RequestParam file: MultipartFile) {
        userService.updateUserPictures(email, file)
    }

    @PostMapping("/createListing")
    fun createListingWithPicture(
        @RequestParam("email") email: String,
        @RequestParam("name") name: String,
        @RequestParam("description") description: String,
        @RequestParam("price") price: Float,
        @RequestParam("file") file: MultipartFile,
        @RequestParam("bathroomNumber") bathroomNumber: Int,
        @RequestParam("bedroomNumber")bedroomNumber: Int,
        @RequestParam("minimumArea")minimumArea: Int,
        @RequestParam("furnished")furnished: Boolean,
        @RequestParam("location")location: String,
        @RequestParam("type")type: propertyType
    ) {
        userService.createListing(email, name, description, price, file,
            bathroomNumber, bedroomNumber, minimumArea, furnished, location, type)
    }
    @GetMapping("/getCount")
    fun getCount(): Long {
        return userService.getCount()
    }

    @GetMapping("/getIdByEmail/{email}")
    fun getUserIdByEmail(@PathVariable email: String): Int? {
        return userService.getUserIdByEmail(email)
    }
}
