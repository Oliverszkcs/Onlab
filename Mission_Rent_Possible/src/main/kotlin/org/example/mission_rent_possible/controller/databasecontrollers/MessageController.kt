package org.example.mission_rent_possible.controller.databasecontrollers

import org.example.mission_rent_possible.model.Message
import org.example.mission_rent_possible.service.MessageService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = ["http://localhost:3000"])
class MessageController(private val messageService: MessageService) {

    @GetMapping("/getById/{id}")
    fun getMessageById(@PathVariable id: Long) {
        messageService.getMessageById(id)
    }
    @PostMapping("/save")
    fun saveMessage(message: Message) {
        messageService.saveMessage(message)
    }

    @DeleteMapping("/{id}")
    fun deleteMessageById(id: Long) {
        messageService.deleteMessageById(id)
    }

    @PutMapping("/{id}")
    fun updateMessage(message: Message) {
        messageService.updateMessage(message)
    }
}