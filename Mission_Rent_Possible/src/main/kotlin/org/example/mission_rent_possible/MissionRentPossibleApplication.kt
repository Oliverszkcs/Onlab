package org.example.mission_rent_possible

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan


@SpringBootApplication(scanBasePackages = arrayOf("org.example.mission_rent_possible"))
@ComponentScan(basePackages = ["org.example.mission_rent_possible", "config"])
class MissionRentPossibleApplication

fun main(args: Array<String>) {
    runApplication<MissionRentPossibleApplication>(*args)
}
