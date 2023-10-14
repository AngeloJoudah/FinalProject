package com.example.kafka;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import org.apache.kafka.clients.consumer.OffsetAndTimestamp;
import org.apache.kafka.common.TopicPartition;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.HashMap;

import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
@Service
public class KafkaConsumerService {

    private Consumer<String,String> consumer;
    public KafkaConsumerService(Consumer<String,String> consumer){
        this.consumer = consumer;
    }
    public List<String> consumeKafkaRecords(String topic, long offset) {
        
        TopicPartition topicPartition = new TopicPartition(topic,0);
        List<String> list = new ArrayList<String>();
        // Seek to the specified offset
        consumer.assign(Collections.singletonList(topicPartition));
        consumer.seek(topicPartition, offset);

        // Start consuming records from the specified offset
        ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(20000)); // Adjust the timeout as needed

        for (ConsumerRecord<String, String> record : records) {
            list.add(record.value().toString());
        }


        return list;
    }
}
/*
 *         List<String> records = new ArrayList<String>();
        Map<TopicPartition, Long> map = new HashMap<TopicPartition, Long>(2);
        map.put(new TopicPartition(topic,0),Long.valueOf(time));
        Map<TopicPartition, OffsetAndTimestamp> offsets = consumer.offsetsForTimes(map);
        for (Map.Entry<TopicPartition, OffsetAndTimestamp> entry : offsets.entrySet()) {
            records.add(entry.getValue().toString());
        }
 */
