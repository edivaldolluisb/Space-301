package ies301.space.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "*")
public class WebSocketController {

    @MessageMapping("/send-data")
    @SendTo("/topic/launch-data")
    public String handleWebSocketMessage(String message) {
        // Processa e responde mensagens enviadas pelo React, se necessário
        return message;
    }
}
