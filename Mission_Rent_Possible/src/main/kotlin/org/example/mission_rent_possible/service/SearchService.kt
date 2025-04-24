package org.example.mission_rent_possible.service

import org.example.mission_rent_possible.model.Search
import org.example.mission_rent_possible.repository.SearchRepo
import org.springframework.stereotype.Service
import java.util.*

@Service
class SearchService(
    private val searchRepo: SearchRepo) {
    fun saveSearch(search: Search){
        searchRepo.save(search)
    }

    fun deleteSearchById(id: Long) {
        searchRepo.deleteById(id)
    }
    fun getSearchById(id: Long): Optional<Search> {
        return searchRepo.findById(id)
    }
}