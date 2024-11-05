package ies301.space.services;

import java.util.List;

import ies301.space.entities.HistoryLaunch;

public interface HistoryService {
    List<HistoryLaunch> getAllHistory();
    
    HistoryLaunch getHistoryById(Long historyId);

    // só para testar
    HistoryLaunch saveHistory(HistoryLaunch historyLaunch);
}
