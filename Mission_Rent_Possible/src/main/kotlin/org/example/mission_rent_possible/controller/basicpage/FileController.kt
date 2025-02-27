package org.example.mission_rent_possible.controller.basicpage

import org.example.mission_rent_possible.service.MinioService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/files")
@CrossOrigin(origins = ["http://localhost:3000"])
class FileController(private var minioService: MinioService) {

    @PostMapping("/upload")
    fun uploadFile(@RequestParam("file") file: MultipartFile?): ResponseEntity<String> {
        return try {
            if (file != null) {
                println("Received file: ${file.originalFilename}, Size: ${file.size} bytes")
            };
            if (file == null || file.isEmpty) {
                ResponseEntity.badRequest().body("File is empty or missing")
            } else {
                val response: String = minioService.uploadFile(file)
                ResponseEntity.ok(response)
            }
        } catch (e: Exception) {
            e.printStackTrace()
            ResponseEntity.badRequest().body("Upload failed: ${e.message}")
        }
    }
}
