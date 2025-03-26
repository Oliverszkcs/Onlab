package org.example.mission_rent_possible.service

import org.example.mission_rent_possible.model.Message
import org.example.mission_rent_possible.repository.MessageRepo
import org.springframework.stereotype.Service

@Service
class MessageService(private val messageRepository: MessageRepo) {

    fun saveMessage(message: Message) {
        messageRepository.save(message)
    }

    fun getMessageById(id: Long): Message? {
        return messageRepository.findById(id).orElse(null)
    }

    fun getAllMessages(): List<Message> {
        return messageRepository.findAll()
    }

    fun deleteMessageById(id: Long) {
        messageRepository.deleteById(id)
    }

    fun updateMessage(message: Message) {
        messageRepository.save(message)
    }

}