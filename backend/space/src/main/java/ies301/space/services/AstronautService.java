package ies301.space.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import ies301.space.entities.Astronaut;
import ies301.space.repositories.AstronautRepository;

@Service
public class AstronautService {
    private final AstronautRepository astronautRepository;

    public AstronautService(AstronautRepository astronautRepository) {
        this.astronautRepository = astronautRepository;
    }

    public List<Astronaut> getAstronautsByLaunchId(Long launchId) {
        return astronautRepository.findByLaunchId(launchId);
    }

    public Optional<Astronaut> getAstronautByLaunchIdAndAstronautId(Long launchId, Long astronautId) {
        return astronautRepository.findByLaunchIdAndId(launchId, astronautId);
    }

    public Astronaut saveAstronaut(Astronaut astronaut) {
        return astronautRepository.save(astronaut);
    }

    public List<Astronaut> getAllAstronauts() {
        return astronautRepository.findAll();
    }

    public Optional<Astronaut> getAstronautById(Long id) {
        return astronautRepository.findById(id);
    }
}