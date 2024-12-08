package ies301.space.services;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

import org.springframework.stereotype.Service;

import ies301.space.entities.Astronaut;
import ies301.space.repositories.AstronautRepository;

@Service
public class AstronautService {
    private final AstronautRepository astronautRepository;
    private final Random random = new Random();

    public AstronautService(AstronautRepository astronautRepository) {
        this.astronautRepository = astronautRepository;
    }

    public Optional<Astronaut> getAstronautById(Long id) {
        return astronautRepository.findById(id);
    }

    public List<Astronaut> getAstronautsByLaunchId(Long launchId) {
        return astronautRepository.findByLaunchId(launchId);
    }

    public Optional<Astronaut> getAstronautByLaunchIdAndAstronautId(Long launchId, Long astronautId) {
        return astronautRepository.findByIdAndLaunchId(astronautId, launchId);
    }

    public Astronaut saveAstronaut(Astronaut astronaut) {
        return astronautRepository.save(astronaut);
    }

    public boolean deleteAstronaut(Long id) {
        if (astronautRepository.existsById(id)) {
            astronautRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Astronaut> getAllAstronauts() {
        return astronautRepository.findAll();
    }

    public List<Astronaut> getAstronautsByIds(Set<Long> astronautIds) {
        return astronautRepository.findByIdIn(astronautIds);
    }
}
