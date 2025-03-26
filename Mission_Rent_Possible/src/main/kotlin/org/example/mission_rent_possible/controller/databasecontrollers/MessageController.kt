package org.example.mission_rent_possible.controller.databasecontrollers

import org.example.mission_rent_possible.model.Message
import org.example.mission_rent_possible.service.MessageService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("messages")
class MessageController(private val messageService: MessageService) {

    @GetMapping("/{id}")
    fun getMessageById(id: Long) {
        messageService.getMessageById(id)
    }
    @PostMapping("/save")
    fun saveMessage(message: Message) {
        messageService.saveMessage(message)
    }

    @GetMapping("/{id}")
    fun deleteMessageById(id: Long) {
        messageService.deleteMessageById(id)
    }

    @GetMapping("/{id}")
    fun updateMessage(message: Message) {
        messageService.updateMessage(message)
    }
}