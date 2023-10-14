package com.example.kafka;

import java.util.List;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("api/v3/messages")
public class MessageController {
	private KafkaConsumerService kafkaConsumerService;
	private KafkaTemplate<String, String> kafkaTemplate;

	public MessageController(KafkaTemplate<String,String> kafkaTemplate, KafkaConsumerService kafkaConsumerService) {
		this.kafkaTemplate = kafkaTemplate;
		this.kafkaConsumerService = kafkaConsumerService;
	}
	@PostMapping("/post")
	public ResponseEntity<?> publish(@RequestBody MessageRequest req) {
		kafkaTemplate.send(req.getTopic(),req.getMessage());
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@GetMapping("/get")
	public ResponseEntity<List<String>> getMessages(@RequestParam MessageConsumeRequest req){
		List<String> records = kafkaConsumerService.consumeKafkaRecords(req.getTopic(),req.getOffset());
        return ResponseEntity.ok(records);		
	}


	
}
