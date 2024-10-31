package ies301.space.repositories;

import ies301.space.models.Alert;
import ies301.space.models.Rocket;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import java.util.List;


@Repository
public interface AlertRepository extends CrudRepository<Alert, Long> {
    List<Alert> findByRocket(Long rocketId);
}
