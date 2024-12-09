package ies301.space.controllers;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ies301.space.broker.QueueSender;
import ies301.space.entities.Astronaut;
import ies301.space.entities.Launch;
import ies301.space.services.AstronautService;
import ies301.space.services.LaunchService;

@RestController
@RequestMapping("/api/v1")
public class LaunchController {
    private final AstronautService astronautService;
    private final LaunchService launchService;

    @Autowired
    private QueueSender queueSender;

    public LaunchController(AstronautService astronautService, LaunchService launchService) {
        this.astronautService = astronautService;
        this.launchService = launchService;
    }

    @GetMapping("/launches/{id}/astronauts")
    public ResponseEntity<List<Astronaut>> getAstronautsByLaunchId(@PathVariable Long id) {
        Optional<Launch> launchOpt = launchService.getLaunchById(id);

        if (launchOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Launch launch = launchOpt.get();
        Set<Long> astronautIds = launch.getAstronauts();

        List<Astronaut> astronauts = astronautService.getAstronautsByIds(astronautIds);

        return ResponseEntity.ok(astronauts);
    }

    @GetMapping("/launches/{launchId}/astronaut/{astronautId}")
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


    @PostMapping("launches/{launchId}/astronaut/{astronautId}")
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



    @PostMapping("/launches")
    public ResponseEntity<Launch> createLaunch(@RequestBody Launch launch) {
        Launch savedLaunch = launchService.saveLaunch(launch);
        return new ResponseEntity<>(savedLaunch, HttpStatus.CREATED);
    }

    @GetMapping("/launches")
    public ResponseEntity<List<Launch>> getAllLaunches() {
        List<Launch> launches = launchService.getAllLaunches();
        return ResponseEntity.ok(launches);
    }

    @GetMapping("/launches/current")
    public ResponseEntity<List<Launch>> getCurrentLaunches() {
        List<Launch> currentLaunches = launchService.getCurrentLaunches();
        return ResponseEntity.ok(currentLaunches);
    }

    @GetMapping("/launches/completed")
    public ResponseEntity<List<Launch>> getAllCompletedLaunches() {
        List<Launch> launches = launchService.getCompletedLauches();
        return ResponseEntity.ok(launches);
    }

    @GetMapping("/launches/{id}")
    public ResponseEntity<Launch> getLaunchById(@PathVariable Long id) {
        Optional<Launch> launch = launchService.getLaunchById(id);
        if (launch.isPresent()) {
            return new ResponseEntity<>(launch.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}