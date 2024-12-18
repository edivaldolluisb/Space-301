package ies301.space.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies301.space.entities.Rocket;
import ies301.space.services.RocketService;

@RestController
@RequestMapping("/api/v1/rockets")
public class RocketController {

    private final RocketService rocketService;

    @Autowired
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
        return new ResponseEntity<>(rockets, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rocket> getRocketById(@PathVariable Long id) {
        Optional<Rocket> rocket = rocketService.getRocketById(id);
        return rocket.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
