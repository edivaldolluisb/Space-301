package ies301.space.services;

import ies301.space.entities.Rocket;
import ies301.space.repositories.RocketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RocketService {

    private final RocketRepository rocketRepository;

    @Autowired
    public RocketService(RocketRepository rocketRepository) {
        this.rocketRepository = rocketRepository;
    }

    public Rocket saveRocket(Rocket rocket) {
        return rocketRepository.save(rocket);
    }

    public List<Rocket> getAllRockets() {
        return rocketRepository.findAll();
    }

    public Optional<Rocket> getRocketById(Long id) {
        return rocketRepository.findById(id);
    }
}
