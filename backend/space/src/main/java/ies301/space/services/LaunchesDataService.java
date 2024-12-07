package ies301.space.services;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import ies301.space.model.Message;

@Service
public class LaunchesDataService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @RabbitListener(queues = "generatorQueue")
    public void consumeMessage(String messageJson) {
        try {
            // Log da mensagem recebida
            System.out.println("Mensagem recebida: " + messageJson);
            Message message = objectMapper.readValue(messageJson, Message.class);
            System.out.println("Objeto desserializado: " + message);
            messagingTemplate.convertAndSend("/topic/"+message.getIdLancamento()+"/astronaut-data", message.getTripulantes());
            messagingTemplate.convertAndSend("/topic/"+message.getIdLancamento()+"/launch-data", message.getNave());
        } catch (Exception e) {
            System.err.println("Erro ao processar mensagem: " + e.getMessage());
        }
    }
}
