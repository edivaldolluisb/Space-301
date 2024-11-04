package ies301.space.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import ies301.space.entities.HistoryLaunch;
import ies301.space.repositories.HistoryRepository;
import ies301.space.services.HistoryService;

@Service
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;

    public HistoryServiceImpl(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    @Override
    public List<HistoryLaunch> getAllHistory() {
        return historyRepository.findAll();
    }

    @Override
    public HistoryLaunch getHistoryById(Long historyId) {
        return historyRepository.findById(historyId).get();
    }

    @Override
    public HistoryLaunch saveHistory(HistoryLaunch historyLaunch) {
        return historyRepository.save(historyLaunch);
    }
}
