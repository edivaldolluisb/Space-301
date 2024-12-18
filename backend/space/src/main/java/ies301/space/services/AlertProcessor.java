package ies301.space.services;

import ies301.space.model.Message;
import ies301.space.entities.Alert;
import ies301.space.entities.Launch;
import ies301.space.model.Message.*;
import ies301.space.entities.Astronaut;

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

    @Autowired
    private AstronautService astronautService;

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
                    for (Alerta alerta : tripulante.getAlertas()) {
                        Astronaut astronaut = astronautService.getAstronautById(tripulante.getId()).orElse(null);
                        if (astronaut != null) {
                            alerta.setOrigem("Tripulante: " + astronaut.getName());
                            alertas.add(alerta);
                            
                        }
                    }
                }
            }

            // Adiciona alertas da nave
            if (message.getNave().getAlertas() != null) {
                for (Alerta alerta : message.getNave().getAlertas()) {
                    alerta.setOrigem("Nave: " + launch.getMissionName()); // Personaliza com a origem
                    alertas.add(alerta);
                }
            }

            for (Alerta alerta : alertas) {

                List<Alert> existingAlerts = alertService.getAlertsByParametroAndLaunch(alerta.getAlertaNome(),
                        launch.getId());
                if (alerta.getStatus() == null || alerta.getAlertaDescricao() == null) {
                    logger.warn("Alerta ignorado por dados incompletos: {}", alerta);
                    continue;
                }

                if (existingAlerts.isEmpty()) {
                    // Criação de novo alerta
                    Alert newAlert = createNewAlert(alerta, launch);
                    Alert savedAlert = alertService.saveAlert(newAlert);
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
    private Alert createNewAlert(Alerta alerta, Launch launch) {
        String alertMessage = alerta.getOrigem() + " - " + alerta.getAlertaDescricao();
        Alert alert = new Alert(alertMessage, launch);
        alert.setDate(new Date());
        alert.setParametro(alerta.getAlertaNome());
        alert.setStatus(alerta.getStatus()); // Define o status do alerta recebido
        return alert;
    }
}
