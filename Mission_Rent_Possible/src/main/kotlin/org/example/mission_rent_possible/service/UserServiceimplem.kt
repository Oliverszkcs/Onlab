package org.example.mission_rent_possible.service

import org.example.mission_rent_possible.model.User
import org.example.mission_rent_possible.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserServiceimplem(private val userRepository: UserRepository) : UserService {

    override fun saveUser(user: User): User {
        return userRepository.save(user)
    }
}