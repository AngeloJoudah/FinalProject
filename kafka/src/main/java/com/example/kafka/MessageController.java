package com.example.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v3/messages")
public class MessageController {
	private KafkaTemplate<String, String> kafkaTemplate;
	public MessageController(KafkaTemplate<String,String> kafkaTemplate) {
		this.kafkaTemplate = kafkaTemplate;
	}
	public void publish(@RequestBody MessageRequest req) {
		kafkaTemplate.send("messages",req.key(),req.message());
	}
	
}
