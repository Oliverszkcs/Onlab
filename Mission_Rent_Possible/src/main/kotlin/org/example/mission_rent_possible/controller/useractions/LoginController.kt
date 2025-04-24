package org.example.mission_rent_possible.controller.useractions

import com.auth0.jwt.JWT
import jakarta.servlet.http.HttpServletResponse
import org.example.mission_rent_possible.model.User
import org.example.mission_rent_possible.service.KeycloakService
import org.example.mission_rent_possible.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = ["http://localhost:3000"])
class LoginController(private val keycloakService: KeycloakService, private val userService: UserService) {

    @PostMapping("/login")
    fun login(@RequestParam username: String?, @RequestParam password: String?, response: HttpServletResponse): ResponseEntity<Map<String, Any>> {
        if (username.isNullOrBlank() || password.isNullOrBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mapOf("error" to "Missing credentials"))
        }


        val tokenResponse = keycloakService.login(username, password)

        return if (tokenResponse != null) {
            val decodedToken= JWT.decode(tokenResponse)
            val email= decodedToken.getClaim("email").asString()
            userService.saveUser(User(username,email))
            ResponseEntity.ok(mapOf("access_token" to tokenResponse))

        } else {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(mapOf("error" to "Invalid credentials"))
        }
    }
}
