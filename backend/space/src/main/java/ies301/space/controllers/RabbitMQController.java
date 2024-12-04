package ies301.space.controllers;

import java.util.Map;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/messages")
public class RabbitMQController {

    @Autowired
    private AmqpTemplate amqpTemplate;

    @Value("${rabbitmq.queue:launchQueue}")
    private String queue;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("/publish")
    public ResponseEntity<String> publishMessage(@RequestBody Map<String, Object> message) {
        try {
            // Converter mensagem para JSON
            String jsonMessage = objectMapper.writeValueAsString(message);
            amqpTemplate.convertAndSend(queue, jsonMessage);
            return ResponseEntity.ok("Message published successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to publish message");
        }
    }
}
