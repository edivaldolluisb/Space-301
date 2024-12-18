package ies301.space.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ies301.space.broker.QueueSender;
import ies301.space.entities.Astronaut;
import ies301.space.entities.Launch;
import ies301.space.entities.Rocket;
import ies301.space.services.AstronautService;
import ies301.space.services.LaunchService;
import ies301.space.services.RocketService;

@RestController
@RequestMapping("/api/v1")
public class LaunchController {
    private final AstronautService astronautService;

    private static final Logger logger = LoggerFactory.getLogger(LaunchController.class);

    private final LaunchService launchService;
    private final RocketService rocketService;

    @Autowired
    private QueueSender queueSender;

    public LaunchController(AstronautService astronautService, LaunchService launchService,
            RocketService rocketService) {
        this.astronautService = astronautService;
        this.launchService = launchService;
        this.rocketService = rocketService;
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

    @GetMapping("/launches/{launchId}/rocket")
    public ResponseEntity<?> getRocketByLaunchAndRocketId(@PathVariable Long launchId) {
        Optional<Launch> launch = launchService.getLaunchById(launchId);
        Long rocketId = launch.get().getRocketId();
        Optional<Rocket> rocket = rocketService.getRocketById(rocketId);
        if (rocket.isPresent()) {
            return new ResponseEntity<>(rocket.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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

    @GetMapping("/launches/active")
    public ResponseEntity<List<Launch>> getActiveLaunches() {
        List<Launch> activeLaunches = launchService.getActiveLaunches();
        return ResponseEntity.ok(activeLaunches);
    }

    @GetMapping("/visitor/launches/active")
    public ResponseEntity<List<Launch>> getVisitorActiveLaunches() {
        List<Launch> activeLaunches = launchService.getActiveLaunches();
        return ResponseEntity.ok(activeLaunches);
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

    // dados do influxdb para os gráficos
    @GetMapping("/launches/{launchId}/{entity}/{entityId}/{field}")
    public ResponseEntity<?> getDynamicData(
            @PathVariable Long launchId,
            @PathVariable String entity,
            @PathVariable(required = false) String entityId, // Para nave, pode ser null
            @PathVariable String field,
            @RequestParam(defaultValue = "1d") String interval) {

        Long parsedEntityId = "null".equals(entityId) ? null : Long.valueOf(entityId); // Converter se necessário

        try {
            List<Map<String, Object>> data = launchService.getDynamicData(launchId, entity, parsedEntityId, field);
            // List<Map<String, Object>> data = launchService.getAveragedData(launchId,
            // entity, parsedEntityId, field, interval);

            return ResponseEntity.ok(data);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching data: " + e.getMessage());
        }
    }

    @GetMapping("/visitor/launches/{launchId}/rocket")
    public ResponseEntity<?> getVisitorRocketByLaunchAndRocketId(@PathVariable Long launchId) {
        Optional<Launch> launch = launchService.getLaunchById(launchId);
        Long rocketId = launch.get().getRocketId();
        Optional<Rocket> rocket = rocketService.getRocketById(rocketId);
        if (rocket.isPresent()) {
            return new ResponseEntity<>(rocket.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/visitor/launches/{id}")
    public ResponseEntity<Launch> getVisitorLaunchById(@PathVariable Long id) {
        Optional<Launch> launch = launchService.getLaunchById(id);
        if (launch.isPresent()) {
            return new ResponseEntity<>(launch.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/visitor/launches/{launchId}/{entity}/{entityId}/{field}")
    public ResponseEntity<?> getDynamicDataVisitor(
            @PathVariable Long launchId,
            @PathVariable String entity,
            @PathVariable(required = false) String entityId,
            @PathVariable String field,
            @RequestParam(defaultValue = "1d") String interval) {

        Long parsedEntityId = "null".equals(entityId) ? null : Long.valueOf(entityId);
        try {
            List<Map<String, Object>> data = launchService.getDynamicData(launchId, entity, parsedEntityId, field);
            return ResponseEntity.ok(data);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching data: " + e.getMessage());
        }
    }

}