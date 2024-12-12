package ies301.space.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

import ies301.space.entities.Alert;

public interface AlertRepository extends JpaRepository <Alert, Long> {
    List<Alert> findAlertsByLaunchId(Long launch_id);

    List<Alert> findAlertsByStatus(boolean status);

    @Query("SELECT a FROM Alert a WHERE a.parametro = :parametro AND a.launch.id = :launchId ORDER BY a.date DESC")
    List<Alert> findAlertsByParametroAndLaunch(@Param("parametro") String parametro, @Param("launchId") Long launchId);
}
