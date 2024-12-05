package ies301.space.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ies301.space.entities.HistoryLaunch;
import ies301.space.services.HistoryService;

@RestController
// @CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class HistoryController {

    private final HistoryService historyService;

    @Autowired
    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
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
    @PostMapping("/history/launches")
    public ResponseEntity<HistoryLaunch> createHistory(@RequestBody HistoryLaunch historyLaunch) {
        return new ResponseEntity<>(historyService.saveHistory(historyLaunch), HttpStatus.CREATED);
    }
}
