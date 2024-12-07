package ies301.space.services;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ies301.space.model.Message;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;

import ies301.space.model.Message.*;
import ies301.space.entities.*;
import ies301.space.repositories.*;
import ies301.space.services.*;

@Service
public class LaunchesDataService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final Logger logger = LoggerFactory.getLogger(LaunchesDataService.class);

    @Autowired
    private LaunchRepository launchRepository;

    @Autowired
    private AlertService alertService;


    @Autowired
    private AlertProcessor alertProcessor;

    @RabbitListener(queues = "generatorQueue")
    public void consumeMessage(String messageJson) {
        try {
            // Log da mensagem recebida
            // logger.info("Mensagem recebida: " + messageJson);
            Message message = objectMapper.readValue(messageJson, Message.class);

            // Valida os dados recebidos
            if (message.getTripulantes() == null || message.getNave() == null) {
                logger.warn("Mensagem com dados incompletos: {}", messageJson);
                return;
            }

            messagingTemplate.convertAndSend("/topic/astronaut-data", message.getTripulantes());
            messagingTemplate.convertAndSend("/topic/launch-data", message.getNave());

            // find launch by id
            Long id = Long.parseLong(message.getIdLancamento());
            logger.info("ID do lançamento: " + id);
            Launch launch = launchRepository.findById(id).orElse(null);
            if (launch == null) {
                logger.error("Lancamento nao encontrado: " + id);
                return;
            }

            // Processa os alertas
            List<Alert> savedAlerts = alertProcessor.processAlerts(message, launch);
            if (!savedAlerts.isEmpty()) {
                logger.info("Alertas salvos e notificados: {}", savedAlerts.size());
            }

        } catch (Exception e) {
            logger.error("Erro ao processar mensagem: ", e.getMessage(), e);

        }
    }


}
