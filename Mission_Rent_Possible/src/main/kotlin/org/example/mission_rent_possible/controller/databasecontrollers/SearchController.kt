package org.example.mission_rent_possible.controller.databasecontrollers

import org.example.mission_rent_possible.model.Search
import org.example.mission_rent_possible.service.SearchService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/search")
@CrossOrigin(origins = ["http://localhost:3000"])
class SearchController(
    private val searchService: SearchService){

    @GetMapping("/getById/{id}")
    fun getSearchById(id: Long) {
        searchService.getSearchById(id)
    }
    @PostMapping("/save")
    fun saveSearch(@RequestBody search: Search) {
        searchService.saveSearch(search)
    }


    @DeleteMapping("/{id}")
    fun deleteSearchById(id: Long) {
        searchService.deleteSearchById(id)
    }
}