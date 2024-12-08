package ies301.space.controllers;

import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ies301.space.broker.QueueSender;
import ies301.space.entities.Astronaut;
import ies301.space.entities.Launch;
import ies301.space.services.AstronautService;
import ies301.space.services.InfluxDBService;
import ies301.space.services.LaunchService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("/api/v1")
public class LaunchController {
    private final AstronautService astronautService;

    private static final Logger logger = LoggerFactory.getLogger(LaunchController.class);
    
    private final LaunchService launchService;

    @Autowired
    private QueueSender queueSender;

    public LaunchController(AstronautService astronautService, LaunchService launchService) {
        this.astronautService = astronautService;
        this.launchService = launchService;
    }

    @GetMapping("/launches/{id}/astronauts")
    public List<Astronaut> getAstronautsByLaunchId(@PathVariable Long id) {
        return astronautService.getAstronautsByLaunchId(id);
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
        // TODO: Send launch data to the queue
        // queueSender.send(launch.toString());
        return new ResponseEntity<>(savedLaunch, HttpStatus.CREATED);
    }

    @GetMapping("/launches")
    public ResponseEntity<List<Launch>> getAllLaunches() {
        List<Launch> launches = launchService.getAllLaunches();
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
            @PathVariable String field) {

                Long parsedEntityId = "null".equals(entityId) ? null : Long.valueOf(entityId); // Converter se necessário

        try {
            logger.info("Fetching dynamic data for launchId: {}, entity: {}, entityId: {}, field: {}", launchId, entity, parsedEntityId, field);
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