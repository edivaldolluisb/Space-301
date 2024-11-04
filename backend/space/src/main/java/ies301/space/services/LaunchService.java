package ies301.space.services;

import java.util.List;

import org.springframework.stereotype.Service;

import ies301.space.entities.Launch;
import ies301.space.repositories.LaunchRepository;

@Service
public class LaunchService {
    private final LaunchRepository launchRepository;

    public LaunchService(LaunchRepository launchRepository) {
        this.launchRepository = launchRepository;
    }

    public Launch saveLaunch(Launch launch) {
        return launchRepository.save(launch);
    }

    public List<Launch> getAllLaunches() {
        return launchRepository.findAll();
    }
}
