package config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


@Configuration
class MinioConfig {
    @Value("\${minio.url}")
    lateinit var url: String

    @Value("\${minio.accessKey}")
    lateinit var accessKey: String

    @Value("\${minio.secretKey}")
    lateinit var secretKey: String

    @Bean
    fun minioClient(): io.minio.MinioClient {
        return io.minio.MinioClient.builder()
            .endpoint(url)
            .credentials(accessKey, secretKey)
            .build()
    }
}