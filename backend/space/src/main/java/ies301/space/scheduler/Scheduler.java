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

import com.google.gson.Gson;
import com.fasterxml.jackson.databind.ObjectMapper;

// At a Fixed Rate

@Component
public class Scheduler {

    private final LaunchService launchService;

    @Autowired
    public Scheduler(LaunchService launchService) {
        this.launchService = launchService;
    }
    
    @Autowired
    private QueueSender queueSender;

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss.SSS");

    @Scheduled(fixedRate = 2000)
    public void checkForPendingLaunches() {
        String strDate = dateFormat.format(new Date());
        System.out.println("Fixed Rate Scheduler: Task running at - " + strDate);

        // Retrieve pending launches using LaunchService
        List<Launch> pendingLaunches = launchService.getPendingLaunches();

        if (pendingLaunches.isEmpty()) {
            System.out.println("No pending launches found.");
        } else {
            System.out.println("Found " + pendingLaunches.size() + " pending launches:");
            for (Launch launch : pendingLaunches) {

                queueSender.send(launch.toString());
                System.out.println("- Sent launch to queue: " + launch.toString());


                // ObjectMapper mapper = new ObjectMapper();
                // String json;
                // try {
                //     json = mapper.writeValueAsString( launch );
                //     System.out.println("- Json converted launch: ");

                //     // Gson gson = new Gson();
                //     // String json = gson.toJson(launch);
                //     // System.out.println(gson.toJson(launch));
                // } catch (JsonProcessingException e) {
                //     e.printStackTrace();
                // }

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
