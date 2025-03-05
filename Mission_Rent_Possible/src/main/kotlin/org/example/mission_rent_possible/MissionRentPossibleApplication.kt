package org.example.mission_rent_possible

import org.example.mission_rent_possible.controller.UserController.UserController
import org.example.mission_rent_possible.model.User
import org.example.mission_rent_possible.repository.UserRepository
import org.example.mission_rent_possible.service.UserService
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan
import org.springframework.data.jpa.repository.JpaRepository

@SpringBootApplication
@ComponentScan(basePackages = ["org.example.mission_rent_possible", "config"])
class MissionRentPossibleApplication

fun main(args: Array<String>) {
    runApplication<MissionRentPossibleApplication>(*args)
}
