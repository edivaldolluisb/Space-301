package ies301.space.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ies301.space.entities.Alert;
import ies301.space.repositories.AlertRepository;

@Service
public class AlertService {
    

    @Autowired
    private AlertRepository alertRepository;

    public Alert saveAlert(Alert alert) {
        return alertRepository.save(alert);
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

    // public Boolean deleteAlert(Long id) {
    //     // return true if sucess deleting false if else

    // }

    // public Alert updateAlert(Long id, Alert alert) {

    // }
    
}
