package com.example.kafka;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import org.apache.kafka.common.TopicPartition;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.stereotype.Service;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;



@Service
public class KafkaConsumerService {
	
	private ConsumerFactory<String,String> consumerFactory;
	public KafkaConsumerService(ConsumerFactory<String,String> consumerFactory) {
		this.consumerFactory = consumerFactory;
	}

    public List<String> consumeKafkaRecordsOffset(String topic, long offset ) {
    	Consumer<String,String> consumer = consumerFactory.createConsumer();
        TopicPartition topicPartition = new TopicPartition(topic,0);
        List<String> list = new ArrayList<String>();
        consumer.assign(Collections.singletonList(topicPartition));
        consumer.seek(topicPartition, offset);
    	ConsumerRecords<String,String> records = consumer.poll(Duration.ofMillis(1000));
        for (ConsumerRecord<String, String> record : records) {
        	if(record.value() != null) {
        		list.add(record.timestamp() + ": " + record.value().toString());
            }
        }
        return list;
    }
    
    public Long getOffset(String topic) {
    	Consumer<String,String> consumer = consumerFactory.createConsumer();
    	TopicPartition topicPartition = new TopicPartition(topic,0);
    	consumer.assign(Collections.singletonList(topicPartition));
    	consumer.seekToEnd(Collections.singletonList(topicPartition));
    	return consumer.position(topicPartition);
    }
    
    public KafkaConsumerResponse consumeKafkaRecordsBase(String topic){
    	Consumer<String,String> consumer = consumerFactory.createConsumer();
    	List<String> list = new ArrayList<String>();
    	TopicPartition topicPartition = new TopicPartition(topic,0);
    	consumer.assign(Collections.singletonList(topicPartition));
    	consumer.seekToEnd(Collections.singletonList(topicPartition));
    	long offset = consumer.position(topicPartition);
    	Long sentOffset = Long.valueOf(offset);
    	offset -= 10;
    	if(offset < 0) {
    		offset = 0;
    	}
    	consumer.seek(topicPartition, offset);
    	ConsumerRecords<String,String> records = consumer.poll(Duration.ofMillis(3000));
	    for (ConsumerRecord<String, String> record : records) {
	        	if(record.value() != null) {
					System.out.println(record.value());
	        		list.add(record.timestamp() + ": " + record.value().toString());
	            }
	    }
        
        return new KafkaConsumerResponse(list,sentOffset);
    }
}
