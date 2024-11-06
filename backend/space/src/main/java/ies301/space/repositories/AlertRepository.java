package ies301.space.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import ies301.space.entities.Alert;

public interface AlertRepository extends JpaRepository <Alert, Long> {
    List<Alert> findAlertsByLaunchId(Long launch_id);
}
