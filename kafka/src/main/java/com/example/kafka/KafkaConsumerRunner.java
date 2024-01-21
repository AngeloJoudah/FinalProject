package com.example.kafka;

import java.time.Duration;
import java.util.Arrays;
import java.util.concurrent.atomic.AtomicBoolean;

import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.common.errors.WakeupException;


public class KafkaConsumerRunner implements Runnable {
    private final AtomicBoolean closed = new AtomicBoolean(false);
    private final Consumer<String,String> consumer;
    private ConsumerRecords<String,String> consumerRecords;
    public KafkaConsumerRunner(Consumer<String,String> consumer) {
    	this.consumer = consumer;

    }
    public void setConsumerRecords(ConsumerRecords<String,String> records) {
    	this.consumerRecords = records; 
    }
    public ConsumerRecords<String,String> getConsumerRecords() {
    	return this.consumerRecords;
    }

    public void run() {
    	ConsumerRecords<String,String> records = null;
        try {
            while (!closed.get()) {
                records = consumer.poll(Duration.ofMillis(1000));
            }
        } catch (WakeupException e) {
            if (!closed.get()) throw e;
        } finally {
        	setConsumerRecords(records);
        	this.consumer.close();
        }
    }

    public void shutdown() {
        closed.set(true);
        consumer.wakeup();
    }
}
