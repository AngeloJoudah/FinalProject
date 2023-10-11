package com.example.kafka;

import org.apache.catalina.connector.Response;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
@RestController
@RequestMapping("api/v3/messages")
public class MessageController {
	private KafkaTemplate<String, String> kafkaTemplate;
	public MessageController(KafkaTemplate<String,String> kafkaTemplate) {
		this.kafkaTemplate = kafkaTemplate;
	}
	@PostMapping("/post")
	public ResponseEntity<String> publish(@RequestBody MessageRequest req) {
		kafkaTemplate.send("messages",req.key(),req.message());

	}
	@KafkaListener(topics = "messages")
	@GetMapping("/get")
	public ResponseEntity<String> getMessages(@RequestBody MessageRequest req){
		kafkaTemplate.receive("messages",req.key());
	}


	
}
