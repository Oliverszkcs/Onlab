package org.example.mission_rent_possible.model

import jakarta.persistence.*
import java.sql.Timestamp

@Entity(name = "message")
class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null

    private var content: String? = null

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var status: MessageStatus? = MessageStatus.SENT

    @Column(nullable = false)
    var timeOfSending: Timestamp? = Timestamp(System.currentTimeMillis())

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    var sender: User? = null

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    var receiver: User? = null

    constructor()

    constructor(content: String?, sender: User?, receiver: User?) {
        this.content = content
        this.sender = sender
        this.receiver = receiver
    }

    fun getContent(): String? = content
    fun setContent(content: String?) { this.content = content }

    override fun toString(): String {
        return "Message{id=$id, content='$content', status=$status, timeOfSending=$timeOfSending}"
    }
}


