package ies301.space.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ies301.space.entities.Launch;
import ies301.space.entities.Status;
import java.util.List;

public interface LaunchRepository extends JpaRepository<Launch, Long> {

    List<Launch> findByStatus(Status status);
}