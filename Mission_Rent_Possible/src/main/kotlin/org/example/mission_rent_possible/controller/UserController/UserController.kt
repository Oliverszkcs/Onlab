package org.example.mission_rent_possible.controller.UserController

import org.example.mission_rent_possible.model.User
import org.example.mission_rent_possible.service.UserService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/users")
class UserController(private val userService: UserService) {

    @PostMapping("/save")
    fun saveUser(@RequestBody user: User): String {
        userService.saveUser(user)
        return "User saved successfully"
    }
}
