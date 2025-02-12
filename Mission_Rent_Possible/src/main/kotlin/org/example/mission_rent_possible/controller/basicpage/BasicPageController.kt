package org.example.mission_rent_possible.controller.basicpage

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class BasicPageController
{

    @GetMapping("/main")
    fun main(): String
    {
        return "main"
    }
}