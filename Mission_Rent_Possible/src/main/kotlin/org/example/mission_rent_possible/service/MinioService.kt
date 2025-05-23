package org.example.mission_rent_possible.service

import io.minio.MinioClient
import io.minio.PutObjectArgs
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class MinioService(
    private val minioClient: MinioClient,
    @Value("\${minio.bucket}") private val bucketName: String
) {
    @Throws(Exception::class)
    fun uploadFile(file: MultipartFile): String {
        println("📂 Debug: file = ${file.originalFilename}, size = ${file.size}")

        minioClient.putObject(
            PutObjectArgs.builder()
                .bucket(bucketName)
                .`object`(file.originalFilename)
                .stream(file.inputStream, file.size, -1)
                .contentType(file.contentType)
                .build()
        )
        return file.originalFilename.toString()
    }

    @Throws(Exception::class)
    fun uploadFiles(files: List<MultipartFile>): String {
        val fileNames = mutableListOf<String>()
        for (file in files) {
            fileNames.add(uploadFile(file))
            println("📂 Debug: file = ${file.originalFilename}, size = ${file.size}")
        }
        return fileNames.joinToString(", ")
    }

    @Throws(Exception::class)
    fun downloadFile(filename: String): ByteArray {
        return minioClient.getObject(
            io.minio.GetObjectArgs.builder()
                .bucket(bucketName)
                .`object`(filename)
                .build()
        ).readAllBytes()
    }
}
