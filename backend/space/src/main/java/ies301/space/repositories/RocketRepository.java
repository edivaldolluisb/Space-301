package ies301.space.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies301.space.entities.Rocket;

@Repository
public interface RocketRepository extends JpaRepository<Rocket, Long> {
}
