package ies301.space.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import ies301.space.entities.Launch;
import ies301.space.entities.Status;
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

    public Optional<Launch> getLaunchById(Long id) {
        return launchRepository.findById(id);
    }

    // get all lunch by pending status
    public List<Launch> getPendingLaunches() {
        // return launchRepository.findByStatus(Status.PENDING);
        
        // get all lunch by pending status where the date is lower than the current date
        List<Launch> launches = launchRepository.findByStatus(Status.PENDING);
        Date currentDate = new Date();
        launches.removeIf(launch -> launch.getLaunchDate().compareTo(currentDate) > 0);

        return launches;

    }
}