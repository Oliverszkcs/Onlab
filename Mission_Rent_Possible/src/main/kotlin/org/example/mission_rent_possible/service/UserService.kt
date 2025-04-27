package org.example.mission_rent_possible.service

import org.example.mission_rent_possible.model.*
import org.example.mission_rent_possible.repository.PictureRepo
import org.example.mission_rent_possible.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class UserService(
    private val userRepository: UserRepository,
    private val fileStorageService: MinioService,
    private val pictureRepo: PictureRepo,
    private val propertyService: PropertyService,
    private val listingService: ListingService
) {
    fun saveUser(user: User) {
         if(userRepository.findByEmail(user.getEmail().toString()) ==null) {
             userRepository.save(user)
         }
     }

    fun getUserIdByEmail(email: String): Int? {
        val user = userRepository.findByEmail(email)
        return user?.id
    }

    fun getUserByEmail(email: String): User? {
        return userRepository.findByEmail(email)
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
        }
    }

    fun createListing(email: String,
                      propertyName: String,
                      description: String,
                      targetPrice: Float,
                      file: MultipartFile,
                      bathroomNumber: Int,
                      bedroomNumber: Int,
                      minimumArea: Int,
                      furnished: Boolean,
                      location: String,
                      type: propertyType
                      ) {
        val user = userRepository.findByEmail(email)
        if (user != null && !file.isEmpty) {
            val property = Property(user,propertyName, bathroomNumber,bedroomNumber,minimumArea,furnished,location,type)
            propertyService.saveProperty(property)

            val listing = Listing(description, targetPrice, user, property)
            listingService.saveListing(listing)

            val fileUrl = fileStorageService.uploadFile(file)
            val picture = Picture(fileUrl, user, listing)
            pictureRepo.save(picture)
        }
    }

    fun getUserProfilePic(email: String): String? {
        val user = userRepository.findByEmail(email)
        if (user != null) {
            val pictures = pictureRepo.findByUser(user)
            return pictures[0].url
        }
        return null
    }

    fun getUserById(id: Long): User? {
        return userRepository.findById(id).orElse(null)
    }

    fun getCount(): Long {
        return userRepository.count()
    }

}