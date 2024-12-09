package ies301.space.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ies301.space.entities.Rocket;

public interface RocketRepository extends JpaRepository<Rocket, Long> {

}