package org.example.mission_rent_possible.controller.basicpage

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping

@Controller
class BasicPageController
{
    @GetMapping("/")
    fun home(): String {
        return "redirect:https://localhost:3000"
    }
    @PostMapping("/")
    fun login(): String {
        return "redirect:https://localhost:3000"
    }
}