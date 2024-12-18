package ies301.space.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ies301.space.entities.HistoryLaunch;

public interface HistoryRepository extends JpaRepository<HistoryLaunch,Long> {}  