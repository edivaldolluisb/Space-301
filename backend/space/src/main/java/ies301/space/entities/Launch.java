package ies301.space.entities;

import java.util.Date;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "Mission name is mandatory")
    private String missionName;
    @NotBlank(message = "Date is mandatory")
    private Date lauchDate;
    @NotBlank(message = "Rocket is mandatory")
    private int rocketId;
    @NotBlank(message = "Address is mandatory")
    private String address;

    @OneToMany(mappedBy = "launch")
    private List<Astronaut> astronauts;

    public Launch() {}
    
    public Launch(String missionName, Date lauchDate, int rocketId, String address) {
        this.missionName = missionName;
        this.lauchDate = lauchDate;
        this.rocketId = rocketId;
        this.address = address;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
