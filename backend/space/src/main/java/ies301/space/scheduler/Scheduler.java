package ies301.space.scheduler;


import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;

import ies301.space.entities.Launch;
import ies301.space.services.LaunchService;
import ies301.space.entities.Status;

import java.util.List;
import java.util.Map;
import java.util.Set;

import ies301.space.broker.QueueSender;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// At a Fixed Rate

@Component
public class Scheduler {

    private final LaunchService launchService;

    private static final Logger logger = LoggerFactory.getLogger(Scheduler.class);

    @Autowired
    public Scheduler(LaunchService launchService) {
        this.launchService = launchService;
    }
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Autowired
    private QueueSender queueSender;

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss.SSS");

    @Scheduled(fixedRate = 5000)
    public void checkForPendingLaunches() {
        String strDate = dateFormat.format(new Date());
        
        logger.info("Fixed Rate Scheduler: Task running at - " + strDate);

        // Retrieve pending launches using LaunchService
        List<Launch> pendingLaunches = launchService.getPendingLaunches();

        if (pendingLaunches.isEmpty()) {
            
            logger.info("No pending launches found.");
        } else {
            logger.info("Found " + pendingLaunches.size() + " pending launches:");
            for (Launch launch : pendingLaunches) {

                // queueSender.send(launch.toString());
                logger.info("- Sent launch to queue: " + launch.toString());
                // get austronauts
                logger.info("- Astronauts: " + launch.getAstronauts());

                launch.setStatus(Status.LAUNCHED);

                /*
                 * serialize to 
                 * id_lancamento: 2
                 * astronauts[
                 * astronaut_id: 1
                 * ]
                 */
                HashMap<String, Long> astronauts;
                List<HashMap<String, Long>> astronautsSet = new ArrayList<HashMap<String,Long>>();
                for (Long astronaut : launch.getAstronauts()) {
                    logger.info("Astronaut: " + astronaut);
                    astronauts = new HashMap<String, Long>();
                    astronauts.put("astronaut_id", astronaut);
                    astronautsSet.add(astronauts);

                }
                // print astronauts
                logger.info("Astronauts Set: " + astronautsSet);

                Map<String, Object> message = Map.of(
                    "id_lancamento", launch.getId(),
                    "astronauts", astronautsSet
                );

                try {
                    String jsonMessage = objectMapper.writeValueAsString(message);
                    queueSender.send(jsonMessage);
                    
                    launch.setStatus(Status.LAUNCHED);
                    
                } catch (JsonProcessingException e) {
                    logger.error("Failed to serialize launch to JSON: " + e.getMessage());
                }

            }
        }
    }
}

