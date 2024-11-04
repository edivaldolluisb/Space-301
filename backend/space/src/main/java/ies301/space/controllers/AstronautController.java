package ies301.space.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies301.space.entities.Astronaut;
import ies301.space.services.AstronautService;

@RestController
@RequestMapping("/astronauts")
public class AstronautController {
    private final AstronautService astronautService;

    public AstronautController(AstronautService astronautService) {
        this.astronautService = astronautService;
    }

    @PostMapping
    public ResponseEntity<Astronaut> createAstronaut(@RequestBody Astronaut astronaut) {
        Astronaut savedAstronaut = astronautService.saveAstronaut(astronaut);
        return new ResponseEntity<>(savedAstronaut, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Astronaut>> getAllAstronauts() {
        List<Astronaut> astronauts = astronautService.getAllAstronauts();
        return ResponseEntity.ok(astronauts);
    }
}
