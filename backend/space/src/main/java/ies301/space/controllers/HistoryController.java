package ies301.space.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ies301.space.entities.HistoryLaunch;
import ies301.space.entities.Launch;
import ies301.space.services.HistoryService;
import ies301.space.services.LaunchService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class HistoryController {

    private final HistoryService historyService;
    private final LaunchService launchService;

    @Autowired
    public HistoryController(HistoryService historyService, LaunchService launchService) {
        this.historyService = historyService;
        this.launchService = launchService;
    }

    @GetMapping("/history/launches")
    public ResponseEntity<List<HistoryLaunch>> getAllHistoryLaunchs() {
        return new ResponseEntity<>(historyService.getAllHistory(), HttpStatus.OK);
    }

    @GetMapping("/history/launches/{id}")
    public ResponseEntity<HistoryLaunch> getHistoryById(@PathVariable("id") Long historyId) {
        return new ResponseEntity<>(historyService.getHistoryById(historyId), HttpStatus.OK);
    }

    // só para testar
    @PostMapping("/history/launches/{id}")
    public ResponseEntity<HistoryLaunch> createHistory(@RequestBody HistoryLaunch historyLaunch, @PathVariable("id") Long launchId) {
        Optional<Launch> launch = launchService.getLaunchById(launchId);
        if (launch.isPresent()) {
            HistoryLaunch savedHistoryLaunch = historyService.saveHistory(historyLaunch);
            savedHistoryLaunch.setLaunch(launch.get());
            return new ResponseEntity<>(historyService.saveHistory(savedHistoryLaunch), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
