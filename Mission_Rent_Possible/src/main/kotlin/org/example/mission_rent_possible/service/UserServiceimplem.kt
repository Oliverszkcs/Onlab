package org.example.mission_rent_possible.service

import org.example.mission_rent_possible.model.User
import org.example.mission_rent_possible.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository)  {
     fun saveUser(user: User): User {
        return userRepository.save(user)
    }
}