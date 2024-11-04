package ies301.space.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ies301.space.entities.Astronaut;

public interface AstronautRepository extends JpaRepository<Astronaut, Long> {
    List<Astronaut> findByLaunchId(Long launchId);
    Optional<Astronaut> findByLaunchIdAndId(Long launchId, Long astronautId);
}