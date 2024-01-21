package com.example.kafka;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {
    @GetMapping("/api/v3/")
    @ResponseStatus(HttpStatus.OK)
    public String healthCheck() {
        return "OK";
    }
}
