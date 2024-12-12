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

            for (Alerta alerta : alertas) {

                List<Alert> existingAlerts = alertService.getAlertsByParametroAndLaunch(alerta.getAlertaNome(),
                        launch.getId());
                if (alerta.getStatus() == null) {
                    continue;
                }
                if (alerta.getAlertaDescricao() == null) {
                    continue;
                }

                if (existingAlerts.isEmpty()) {
                    // Não há alertas com esse parametro e lançamento, criar um novo
                    String alertMessage = alerta.getAlertaDescricao() + " - " + launch.getMissionName();
                    Alert alert = new Alert(alertMessage, launch);
                    alert.setDate(new Date());
                    alert.setParametro(alerta.getAlertaNome());

                    Alert savedAlert = alertService.saveAlert(alert);
                    savedAlerts.add(savedAlert);

                    logger.info("Novo alerta salvo: {}", savedAlert);
                } else {

                    // I'm updating it
                    Alert existingAlert = existingAlerts.get(0);
                    if (existingAlert.getStatus() && alerta.getStatus()) {
                        existingAlert.setStatus(false);
                        
                    }
                    existingAlert.setDate(new Date()); 
                    Alert updatedAlert = alertService.saveAlert(existingAlert);
                    savedAlerts.add(updatedAlert);

                    logger.info("Atualizado alerta existente: {}", updatedAlert);
                }
            }

        } catch (Exception e) {
            logger.error("Erro ao processar alertas: {}", e.getMessage(), e);
        }

        return savedAlerts;
    }
}
