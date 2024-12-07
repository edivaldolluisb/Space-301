package ies301.space.services;

import ies301.space.model.Message;
import ies301.space.entities.Alert;
import ies301.space.entities.Launch;
import ies301.space.model.Message.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class AlertProcessor {

    private static final Logger logger = LoggerFactory.getLogger(AlertProcessor.class);

    @Autowired
    private AlertService alertService;

    /**
     * Processa os alertas dos tripulantes e da nave e os salva no banco de dados.
     */
    public List<Alert> processAlerts(Message message, Launch launch) {
        List<Alert> savedAlerts = new ArrayList<>();

        try {
            List<Alerta> alertas = new ArrayList<>();

            // Adiciona alertas dos tripulantes
            for (Tripulante tripulante : message.getTripulantes()) {
                if (tripulante.getAlertas() != null) {
                    alertas.addAll(tripulante.getAlertas());
                }
            }

            // Adiciona alertas da nave
            if (message.getNave().getAlertas() != null) {
                alertas.addAll(message.getNave().getAlertas());
            }

            // Cria e salva os alertas apenas se o status for true
            for (Alerta alerta : alertas) {
                if (alerta.getStatus() != null && alerta.getStatus()) { 
                    String alertMessage = alerta.getAlertaDescricao();
                    if (alertMessage == null || alertMessage.isEmpty()) {
                        continue;
                    }
                    logger.info("status: {}", alerta.getStatus());
    
                    // logger.info("Processando alerta: {}", alertMessage);
    
                    Alert alert = new Alert(alertMessage, launch);
                    alert.setDate(new Date());
                    Alert savedAlert = alertService.saveAlert(alert);
                    savedAlerts.add(savedAlert);
    
                    // logger.info("Alerta salvo: {}", savedAlert);
                } else {
                    logger.info("Alerta ignorado devido ao status: {}", alerta.getStatus());
                }
            
            }

        } catch (Exception e) {
            logger.error("Erro ao processar alertas: {}", e.getMessage(), e);
        }

        return savedAlerts;
    }
}
