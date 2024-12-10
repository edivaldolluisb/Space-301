package ies301.space.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies301.space.entities.Rocket;
import ies301.space.services.RocketService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/v1/rockets")
public class RocketController {
    private final RocketService rocketService;
    public RocketController(RocketService rocketService) {
        this.rocketService = rocketService;
    }

    @PostMapping
    public ResponseEntity<Rocket> createRocket(@RequestBody Rocket rocket) {
        Rocket savedRocket = rocketService.saveRocket(rocket);
        return new ResponseEntity<>(savedRocket, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Rocket>> getAllRockets() {
        List<Rocket> rockets = rocketService.getAllRockets();
        return ResponseEntity.ok(rockets);
    }

    @PostMapping("/test")
    public Rocket test(@RequestBody Rocket r) {
        return r;
    }

}