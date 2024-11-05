package ies301.space.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ies301.space.entities.Launch;

public interface LaunchRepository extends JpaRepository<Launch, Long> {
}