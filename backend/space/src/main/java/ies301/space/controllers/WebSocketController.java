package ies301.space.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
public class WebSocketController {

    @MessageMapping("/launch-data")
    @SendTo("/topic/launch-data")
    public String handleLauch(String message) {
        // Processa e responde mensagens enviadas pelo React, se necessário
        return message;
    }

    @MessageMapping("/astronaut-data")
    @SendTo("/topic/astronaut-data")
    public String handleAstronaut(String message) {
        // Processa e responde mensagens enviadas pelo React, se necessário
        return message;
    }
}
