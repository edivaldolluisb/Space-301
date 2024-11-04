package ies301.space.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies301.space.entities.Astronaut;
import ies301.space.services.AstronautService;

@RestController
@RequestMapping("/launches")
public class LaunchController {
    private final AstronautService astronautService;

    public LaunchController(AstronautService astronautService) {
        this.astronautService = astronautService;
    }

    @GetMapping("/{id}/astronauts")
    public List<Astronaut> getAstronautsByLaunchId(@PathVariable Long id) {
        return astronautService.getAstronautsByLaunchId(id);
    }

    @GetMapping("/{launchId}/astronaut/{astronautId}")
    public ResponseEntity<?> getAstronautByLaunchAndAstronautId(
            @PathVariable Long launchId,
            @PathVariable Long astronautId) {
        
        Optional<Astronaut> astronaut = astronautService.getAstronautByLaunchIdAndAstronautId(launchId, astronautId);
        
        if (astronaut.isPresent()) {
            return new ResponseEntity<>(astronaut.get(), HttpStatus.OK);
        } else {
            return ResponseEntity.status(404).body("Astronaut not found for the specified launch and astronaut IDs");
        }
    }
}