package org.example.mission_rent_possible.controller.basicpage


import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class BasicPageController {

    @GetMapping("/main")
    fun login(): String {
        return "index"
    }
}
