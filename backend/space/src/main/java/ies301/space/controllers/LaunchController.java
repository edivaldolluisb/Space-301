package ies301.space.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies301.space.entities.Astronaut;
import ies301.space.entities.Launch;
import ies301.space.services.AstronautService;
import ies301.space.services.LaunchService;

@RestController
@RequestMapping("/launches")
public class LaunchController {
    private final AstronautService astronautService;
    private final LaunchService launchService;

    public LaunchController(AstronautService astronautService, LaunchService launchService) {
        this.astronautService = astronautService;
        this.launchService = launchService;
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
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Astronaut not found for the specified launch and astronaut IDs");
        }
    }

    @PostMapping
    public ResponseEntity<Launch> createLaunch(@RequestBody Launch launch) {
        Launch savedLaunch = launchService.saveLaunch(launch);
        return new ResponseEntity<>(savedLaunch, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Launch>> getAllLaunches() {
        List<Launch> launches = launchService.getAllLaunches();
        return ResponseEntity.ok(launches);
    }

    @PostMapping("/{launchId}/add-astronaut/{astronautId}")
    public ResponseEntity<String> addAstronautToLaunch(
            @PathVariable Long launchId,
            @PathVariable Long astronautId) {
        
        Optional<Launch> launchOpt = launchService.getLaunchById(launchId);
        Optional<Astronaut> astronautOpt = astronautService.getAstronautById(astronautId);

        if (launchOpt.isPresent() && astronautOpt.isPresent()) {
            Launch launch = launchOpt.get();
            Astronaut astronaut = astronautOpt.get();
            astronaut.setLaunch(launch);
            astronautService.saveAstronaut(astronaut);
            return new ResponseEntity<>("Astronaut added to launch successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Launch or Astronaut not found", HttpStatus.NOT_FOUND);
        }
    }
}