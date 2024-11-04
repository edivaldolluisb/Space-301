package ies301.space.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Launch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String missionName;

    @OneToMany(mappedBy = "launch")
    private List<Astronaut> astronauts;

    public Launch() {}
    
    public Launch(String missionName) {
        this.missionName = missionName;
    }

    public double getId() {
        return id;
    }

    public List<Astronaut> getAstronauts() {
        return astronauts;
    }

    public void setAstronauts(List<Astronaut> astronauts) {
        this.astronauts = astronauts;
    }

    public void addAstronaut(Astronaut astronaut) {
        astronauts.add(astronaut);
        astronaut.setLaunch(this);
    }

    public void removeAstronaut(Astronaut astronaut) {
        astronauts.remove(astronaut);
        astronaut.setLaunch(null);
    }   

    public String getMissionName() {
        return missionName;
    }
}