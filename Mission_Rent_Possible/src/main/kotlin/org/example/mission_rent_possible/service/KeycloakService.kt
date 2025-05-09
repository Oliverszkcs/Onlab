package org.example.mission_rent_possible.service

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.net.URLEncoder
import java.nio.charset.StandardCharsets

@Service
class KeycloakService {
    private val restTemplate: RestTemplate = RestTemplate()
    private val objectMapper = ObjectMapper()

    fun login(username: String, password: String): String? {
        val tokenUrl = "http://localhost:8080/realms/Mission_Rent_Possible/protocol/openid-connect/token"

        println("Requesting token with parameters: username=$username, password=******, client_id=reactlogin")

        val encodedUsername = URLEncoder.encode(username, StandardCharsets.UTF_8.toString())
        val encodedPassword = URLEncoder.encode(password, StandardCharsets.UTF_8.toString())

        val body = "client_id=reactlogin" +
                "&client_secret=7H17aNsVu7HouXeEbhBa1CcFqhfWciCf" +
                "&username=$encodedUsername" +
                "&password=$encodedPassword" +
                "&grant_type=password"

        val headers = HttpHeaders()
        headers["Content-Type"] = "application/x-www-form-urlencoded"

        val entity = HttpEntity(body, headers)

        return try {
            println("Sending request to Keycloak at: $tokenUrl")
            val response: ResponseEntity<String> = restTemplate.exchange(tokenUrl, HttpMethod.POST, entity, String::class.java)

            if (response.statusCode.is2xxSuccessful) {
                val responseBody = response.body
                println("Received response from Keycloak: $responseBody")

                val jsonNode: JsonNode = objectMapper.readTree(responseBody)
                val accessToken = jsonNode["access_token"]?.asText()

                println("Extracted Access Token: $accessToken")
                accessToken
            } else {
                println("Failed to get token: ${response.statusCode} ${response.body}")
                null
            }
        } catch (e: Exception) {
            println("Error during token request: ${e.message}")
            e.printStackTrace()
            null
        }
    }


    fun register(username: String, email: String, password: String,firstName: String, lastName: String): Boolean {
        val adminToken = getAdminToken() ?: return false

        val headers = HttpHeaders()
        headers.setBearerAuth(adminToken)
        headers["Content-Type"] = "application/json"

        val user = mapOf(
            "username" to username,
            "email" to email,
            "enabled" to true,
            "emailVerified" to true,
            "firstName" to firstName,
            "lastName" to lastName,
            "credentials" to listOf(
                mapOf(
                    "type" to "password",
                    "value" to password,
                    "temporary" to false
                )
            )
        )

        val entity = HttpEntity(user, headers)

        return try {
            val response = restTemplate.postForEntity(
                "http://localhost:8080/admin/realms/Mission_Rent_Possible/users",
                entity,
                String::class.java
            )
            response.statusCode.is2xxSuccessful
        } catch (e: Exception) {
            println("Registration error: ${e.message}")
            false
        }
    }
    fun getAdminToken(): String? {
        val tokenUrl = "http://localhost:8080/realms/Mission_Rent_Possible/protocol/openid-connect/token"

        val body = "client_id=user-reg-service" +
                "&client_secret=jRFjgvgo8GyPoqE1DB3beZJZkCdJHtSW" +
                "&grant_type=client_credentials"

        val headers = HttpHeaders()
        headers["Content-Type"] = "application/x-www-form-urlencoded"

        val entity = HttpEntity(body, headers)

        return try {
            val response = restTemplate.exchange(tokenUrl, HttpMethod.POST, entity, String::class.java)
            if (response.statusCode.is2xxSuccessful) {
                val jsonNode = objectMapper.readTree(response.body)
                jsonNode["access_token"]?.asText()
            } else null
        } catch (e: Exception) {
            println("Failed to get admin token: ${e.message}")
            null
        }
    }



}
