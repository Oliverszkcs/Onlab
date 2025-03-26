package org.example.mission_rent_possible.controller.databasecontrollers

import org.example.mission_rent_possible.model.User
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

    @GetMapping("/all")
    fun getAllUsers(): List<User> {
        return userService.getAllUsers()
    }

    @PostMapping("{id}")
    fun deleteUserById(@PathVariable id: Long) {
        userService.deleteUserById(id)
    }

    @PostMapping("{id}")
    fun deleteUser(@RequestBody email: String) {
        userService.deleteUser(email)
    }

    @PostMapping("{id}")
    fun updateUser(@RequestBody user: User) {
        userService.updateUser(user)
    }

    @PostMapping("/get")
    fun getUserByEmail(@RequestBody email: String): User? {
        return userService.getUserByEmail(email)
    }

    @PostMapping("/updatePictures")
    fun updateUserPictures(@RequestParam email: String, @RequestParam file: MultipartFile) {
        userService.updateUserPictures(email, file)
    }

}
