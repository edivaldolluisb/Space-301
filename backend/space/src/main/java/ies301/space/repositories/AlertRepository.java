package ies301.space.repositories;

import ies301.space.models.Alert;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AlertRepository extends CrudRepository<Alert, Long> {
    List<Alert> findByRocket(Long rocketId);
}
