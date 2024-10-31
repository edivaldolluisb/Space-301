package ies301.space.controllers;

import ies301.space.models.Alert;
import ies301.space.repositories.AlertRepository;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class AlertController {

    private final AlertRepository alertRepository;

    @Autowired
    public AlertController(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    @GetMapping("/alerts")
    public List<Alert> getAllAlerts() {
        return (List<Alert>) alertRepository.findAll();
    }

    @GetMapping("/alerts/{id}")
    public ResponseEntity<Alert> getAlertById(@PathVariable Long id) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alert not found for this id: " + id));
        return ResponseEntity.ok(alert);
    }

    // mark alert as viewed
    @PatchMapping("/alerts/{id}")
    public ResponseEntity<Alert> updateAlert(@PathVariable Long id, @Valid @RequestBody Alert alertDetails) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alert not found for this id: " + id));

        alert.setViewed(alertDetails.isViewed());
        final Alert updatedAlert = alertRepository.save(alert);
        return ResponseEntity.ok(updatedAlert);
    }

    // private Map<String, String> buildSuccessResponse(String message) {
    //     Map<String, String> response = new HashMap<>();
    //     response.put("message", message);
    //     return response;
    // }

    // @ExceptionHandler(ResourceNotFoundException.class)
    // public ResponseEntity<Map<String, String>> handleResourceNotFoundException(ResourceNotFoundException ex) {
    //     Map<String, String> errorResponse = new HashMap<>();
    //     errorResponse.put("message", ex.getMessage());
    //     return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    // }
    
}
