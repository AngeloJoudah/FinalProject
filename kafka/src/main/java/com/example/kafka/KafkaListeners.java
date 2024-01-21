package com.example.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaListeners {
	@KafkaListener(
			topics = "messages",
			groupId= "msgId"
	)
	void listener(String data) {
		
	}
}
