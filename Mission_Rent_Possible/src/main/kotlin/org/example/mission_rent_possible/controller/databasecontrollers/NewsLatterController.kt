package org.example.mission_rent_possible.controller.databasecontrollers

import org.example.mission_rent_possible.model.newsLatter
import org.example.mission_rent_possible.repository.NewsLatterRepo
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/news")
@CrossOrigin(origins = ["http://localhost:3000"])
class NewsLatterController(private val newsLatterRepo: NewsLatterRepo) {

    @PostMapping("/subscribe")
    fun subscribeToNewsletter(@RequestBody body: Map<String, String>) {
        val email = body["email"] ?: return
        newsLatterRepo.save(newsLatter(email))
    }
}