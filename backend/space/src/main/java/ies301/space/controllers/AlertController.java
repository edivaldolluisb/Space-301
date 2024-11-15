package ies301.space.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    // to create a new alert
    @PostMapping("/alert")
    public ResponseEntity<Alert> createAlert(@RequestBody Alert alert) {
        Alert savedAlert = alertService.saveAlert(alert);
        return new ResponseEntity<>(savedAlert, HttpStatus.CREATED);
    }

    @PatchMapping("/alert/{id}/status")
    public ResponseEntity<Alert> updateAlertStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest request) {
        Alert updatedAlert = alertService.updateAlertStatus(id, request.getStatus());
        return ResponseEntity.ok(updatedAlert);
    }

    static class UpdateStatusRequest {
        private boolean status;

        public boolean getStatus() {
            return status;
        }
    }

    @PatchMapping("/alerts/update-all")
    public ResponseEntity<Map<String, Integer>> updateAllAlertStatuses() {
        int updatedAlerts = alertService.updateAllStatusesToTrue();
            Map<String, Integer> response = new HashMap<>();
            response.put("updated", updatedAlerts);
            return ResponseEntity.ok(response);
    }

}
