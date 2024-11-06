package ies301.space.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies301.space.entities.Alert;
import ies301.space.entities.Launch;
import ies301.space.services.AlertService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/v1")
public class AlertController {
    
    @Autowired
    private AlertService alertService;

    @GetMapping("/alerts")
    public List<Alert> getAllAlerts() {
        return alertService.getAlerts();
    }

    // get all alerts from a launch
    @GetMapping("/alerts/launch/{id}")
    public List<Alert> getAlertsByLaunchId(@PathVariable(value = "id") Long launch_id) {
        return alertService.getAlertsByLaunchId(launch_id);
    }

    @GetMapping("/alert/{id}")
    public Alert getaAlertById(@PathVariable(value = "id") Long alertId) {
        return alertService.getAlertById(alertId);
    }

    //to create a new alert
    @PostMapping("/alert")
    public ResponseEntity<Alert> createAlert(@RequestBody Alert alert) {
        Alert savedAlert = alertService.saveAlert(alert);
        return new ResponseEntity<>(savedAlert, HttpStatus.CREATED);
    }

    
}
