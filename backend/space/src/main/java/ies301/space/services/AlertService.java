package ies301.space.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ies301.space.entities.Alert;
import ies301.space.repositories.AlertRepository;

import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AlertService {

    // private static final Logger logger = LoggerFactory.getLogger(AlertService.class);

    @Autowired
    private AlertRepository alertRepository;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public Alert saveAlert(Alert alert) {

        // logger.info("Saving alert: {}", alert);
        Alert savedAlert = alertRepository.save(alert);
        List<Alert> allAlerts = alertRepository.findAll();
        messagingTemplate.convertAndSend("/topic/alerts", allAlerts);
        return savedAlert;
        // return alertRepository.save(alert);
    }

    public List<Alert> getAlerts() {
        return alertRepository.findAll();
    }

    public Alert getAlertById(Long id) {
        return alertRepository.findById(id).orElse(null);
    }
    
    public List<Alert> getAlertsByLaunchId(Long launch_id) {
        return alertRepository.findAlertsByLaunchId(launch_id);
    }


    public Alert updateAlertStatus(Long alertId, boolean newStatus) {
        Optional<Alert> optionalAlert = alertRepository.findById(alertId);

        if (optionalAlert.isPresent()) {
            Alert alert = optionalAlert.get();
            alert.setStatus(newStatus);
            Alert updatedAlert = alertRepository.save(alert);
            List<Alert> allAlerts = alertRepository.findAll();
            messagingTemplate.convertAndSend("/topic/alerts", allAlerts);
            return updatedAlert;
            // return alertRepository.save(alert);
        }
        else {
            throw new ResourceNotFoundException("Alert not found");
        }
    }
    public static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }

    /**
     * Update all alerts statuses to true
     * @return number of alerts updated
     */
    public int updateAllStatusesToTrue() {
        List<Alert> alerts = alertRepository.findAlertsByStatus(false);
        alerts.forEach(alert -> {
            alert.setStatus(true);
        });
        alertRepository.saveAll(alerts);
        List<Alert> allAlerts = alertRepository.findAll();
        messagingTemplate.convertAndSend("/topic/alerts", allAlerts);
        return alerts.size();
    }

    // delete an alert
    public Boolean deleteAlert(Long id){
        Optional<Alert> optionalAlert = alertRepository.findById(id);
        if (optionalAlert.isPresent()) {
            alertRepository.deleteById(id);
            // messagingTemplate.convertAndSend("/topic/alerts", "Alert deleted with ID: " + id);
            return true;
        }
        return false;
    }
    
}
