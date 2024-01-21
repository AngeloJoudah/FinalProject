package com.example.kafka;


import org.springframework.lang.Nullable;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KafkaConsumerResponse {
	List<String> messages;
	@Nullable
	Long offset;
}
