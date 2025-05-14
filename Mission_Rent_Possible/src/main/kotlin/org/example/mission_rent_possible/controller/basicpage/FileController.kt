package org.example.mission_rent_possible.controller.basicpage

import org.example.mission_rent_possible.model.propertyType
import org.example.mission_rent_possible.service.ListingService
import org.example.mission_rent_possible.service.MinioService
import org.example.mission_rent_possible.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile


@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/files")
class FileController(
    private var minioService: MinioService,
    private var userService: UserService,
    private val listingService: ListingService
) {

    @PostMapping("/upload")
    fun uploadFile(@RequestParam("files") files: List<MultipartFile>,
                   @RequestParam("name") name: String,
                   @RequestParam("description") description: String,
                   @RequestParam("price") price: Float,
                   @RequestParam("email") email: String,
                   @RequestParam("bathroomNumber") bathroomNumber: Int,
                   @RequestParam("bedroomNumber") bedroomNumber: Int,
                   @RequestParam("minimumArea") minimumArea: Int,
                   @RequestParam("furnished") furnished: Boolean,
                   @RequestParam("location") location: String,
                   @RequestParam("type") type: propertyType
                   ): ResponseEntity<String>
    {
        return try {
            println("Files: $files")
            println("Description: $description")
            ;
            if (files.isEmpty()) {
                ResponseEntity.badRequest().body("File is empty or missing")
            } else {
                val response: String = minioService.uploadFiles(files)
                userService.createListing(email,name,description,price,files,bathroomNumber,bedroomNumber,minimumArea,furnished,location,type)

                ResponseEntity.ok(response)
            }
        } catch (e: Exception) {
            e.printStackTrace()
            ResponseEntity.badRequest().body("Upload failed: ${e.message}")
        }
    }

    @PostMapping("/download")
    fun downloadFile(@RequestParam("filename") filename: String): ResponseEntity<ByteArray> {
        return try {
            val file: ByteArray = minioService.downloadFile(filename)
            ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=$filename")
                .body(file)
        } catch (e: Exception) {
            e.printStackTrace()
            ResponseEntity.badRequest().body(ByteArray(0))
        }
    }
}
