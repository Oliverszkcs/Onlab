package org.example.mission_rent_possible.service

import org.example.mission_rent_possible.model.User
import org.example.mission_rent_possible.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class UserService(private val userRepository: UserRepository, private val fileStorageService: MinioService) {
     fun saveUser(user: User) {
         if(userRepository.findByEmail(user.getEmail().toString()) ==null) {
             userRepository.save(user)
         }
     }

    fun getUserByEmail(email: String): User? {
        return userRepository.findByEmail(email)
    }

    fun updateUser(user: User) {
        userRepository.save(user)
    }

    fun deleteUser(email: String) {
        val user = userRepository.findByEmail(email)
        if (user != null) {
            userRepository.delete(user)
        }
    }

    fun deleteUserById(id: Long) {
        userRepository.deleteById(id)
    }

    fun getAllUsers(): List<User> {
        return userRepository.findAll()
    }

    fun updateUserPictures(email: String, file: MultipartFile) {
        val user = userRepository.findByEmail(email)
        if (user != null && file.isEmpty.not()) {
            val fileUrl = fileStorageService.uploadFile(file)
            user.setPictures(fileUrl)
            userRepository.save(user)
        }
    }


}