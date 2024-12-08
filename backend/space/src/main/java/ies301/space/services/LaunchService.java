package ies301.space.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ies301.space.entities.Launch;
import ies301.space.entities.Status;
import ies301.space.repositories.LaunchRepository;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class LaunchService {
    private final LaunchRepository launchRepository;

    private static final Logger logger = LoggerFactory.getLogger(LaunchService.class);

    @Autowired
    private InfluxDBService influxDBService;

    public LaunchService(LaunchRepository launchRepository) {
        this.launchRepository = launchRepository;
    }

    public Launch saveLaunch(Launch launch) {
        return launchRepository.save(launch);
    }

    // update launch status
    public Launch updateLaunchStatus(Long id, Status status) {
        Optional<Launch> launch = launchRepository.findById(id);
        if (launch.isPresent()) {
            launch.get().setStatus(status);
            return launchRepository.save(launch.get());
        }
        return null;
    }

    public List<Launch> getAllLaunches() {
        return launchRepository.findAll();
    }

    public Optional<Launch> getLaunchById(Long id) {
        return launchRepository.findById(id);
    }

    // get all lunch by pending status
    public List<Launch> getPendingLaunches() {
        // return launchRepository.findByStatus(Status.PENDING);
        
        // get all lunch by pending status where the date is lower than the current date
        List<Launch> launches = launchRepository.findByStatus(Status.PENDING);
        Date currentDate = new Date();
        launches.removeIf(launch -> launch.getLaunchDate().compareTo(currentDate) > 0);

        return launches;

    }

    public List<Map<String, Object>> getDynamicData(Long launchId, String entity, Long entityId, String field) {
        if (!List.of("nave", "tripulante").contains(entity.toLowerCase())) {
            throw new IllegalArgumentException("Invalid entity type. Must be 'nave' or 'tripulante'.");
        }
    
        if ("nave".equalsIgnoreCase(entity)) {
            // Consultar dados da nave
            return influxDBService.fetchNaveData(launchId, field);
        } else if ("tripulante".equalsIgnoreCase(entity)) {
            if (entityId == null) {
                throw new IllegalArgumentException("Tripulante ID must be provided for entity 'tripulante'.");
            }
            // Consultar dados de um tripulante específico
            return influxDBService.fetchTripulanteData(launchId, entityId, field);
        } else {
            throw new IllegalArgumentException("Entity type not supported.");
        }
    }


    // public List<Map<String, Object>> getAveragedData(Long launchId, String entity, Long entityId, String field, String interval) {
    //     return influxDBService.getAveragedData(launchId, entity, entityId, field, interval);
    // }
    
}