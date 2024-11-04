package ies301.space.entities;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "launch")
public class Launch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String missionName;
    private Date lauchDate;
    private int rocketId;
    private String location;


    @OneToMany(mappedBy = "launch")
    private List<Astronaut> astronauts;

    public Launch() {}
    
    public Launch(String missionName, Date lauchDate, int rocketId, String location) {
        this.missionName = missionName;
        this.lauchDate = lauchDate;
        this.rocketId = rocketId;
        this.location = location;
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

    public void setMissionName(String missionName) {
        this.missionName = missionName;
    }

    public Date getLauchDate() {
        return lauchDate;
    }

    public void setLauchDate(Date lauchDate) {
        this.lauchDate = lauchDate;
    }

    public int getRocketId() {
        return rocketId;
    }

    public void setRocketId(int rocketId) {
        this.rocketId = rocketId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}