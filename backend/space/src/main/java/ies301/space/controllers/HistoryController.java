package ies301.space.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import ies301.space.entities.HistoryLaunch;
import ies301.space.services.HistoryService;

import java.util.List;

@RestController
@RequestMapping("history")
public class HistoryController {

    private final HistoryService historyService;

    @Autowired
    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping("/launches")
    public ResponseEntity<List<HistoryLaunch>> getAllHistoryLaunchs() {
        return new ResponseEntity<>(historyService.getAllHistory(), HttpStatus.OK);
    }

    @GetMapping("/launches/{id}")
    public ResponseEntity<HistoryLaunch> getHistoryById(@PathVariable("id") Long historyId) {
        return new ResponseEntity<>(historyService.getHistoryById(historyId), HttpStatus.OK);
    }

    // só para testar
    @PostMapping("/launches")
    public ResponseEntity<HistoryLaunch> createHistory(@RequestBody HistoryLaunch historyLaunch) {
        return new ResponseEntity<>(historyService.saveHistory(historyLaunch), HttpStatus.CREATED);
    }
}
