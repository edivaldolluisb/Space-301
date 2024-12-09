package ies301.space.services;

import java.util.List;

import org.springframework.stereotype.Service;

import ies301.space.entities.Rocket;
import ies301.space.repositories.RocketRepository;

@Service
public class RocketService {
    private final RocketRepository rocketRepository;

    public RocketService(RocketRepository rocketRepository) {
        this.rocketRepository = rocketRepository;
    }

    public List<Rocket> getAllRockets() {
        return rocketRepository.findAll();
    }

    public Rocket saveRocket(Rocket rocket) {
        return rocketRepository.save(rocket);
    }
}