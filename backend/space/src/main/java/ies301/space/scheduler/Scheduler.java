package ies301.space.scheduler;


import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;

import ies301.space.entities.Launch;
import ies301.space.services.LaunchService;

import java.util.List;

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

                queueSender.send(launch.toString());

            }
        }
    }
}

// @Component
// public class Scheduler {

//     // Method
//     // To trigger the scheduler to run every two seconds
//     @Scheduled(fixedRate = 2000) public void scheduleTask()
//     {
//         // private final LaunchService launchService;

//         SimpleDateFormat dateFormat = new SimpleDateFormat(
//             "dd-MM-yyyy HH:mm:ss.SSS");

//         String strDate = dateFormat.format(new Date());

//         System.out.println(
//             "Fixed rate Scheduler: Task running at - "
//             + strDate);

//         // get all pending launches
        
//     }
// }
