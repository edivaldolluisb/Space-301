package ies301.space.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "launch")
public class Launch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message="Mission's name is mandotory")
    private String missionName;
    @NotNull(message="Date is mandotory")
    private Date lauchDate;
    @NotNull(message="Rocket is mandotory")
    private int rocketId;
    @NotBlank(message="Address is mandotory")
    private String address;

    private Status status = Status.PENDING;

    @OneToMany(mappedBy = "launch")
    private Set<Astronaut> astronauts = new HashSet<>();

    @OneToMany(mappedBy = "launch")
    private List<Alert> alerts;

    public Launch() {this.astronauts = new HashSet<>();}
    
    public Launch(String missionName, Date lauchDate, int rocketId, String address, Status status, Set<Astronaut> astronauts) {


        this.missionName = missionName;
        this.lauchDate = lauchDate;
        this.rocketId = rocketId;
        this.address = address;

        this.status = status;

        this.astronauts = astronauts;
    }

    public double getId() {
        return id;
    }

    public Set<Astronaut> getAstronauts() {
        return astronauts;
    }

    public void setAstronauts(Set<Astronaut> astronauts) {
        this.astronauts = astronauts;
    }

    public void addAstronaut(Astronaut astronaut) {
        astronauts.add(astronaut);
    }

    public void removeAstronaut(Astronaut astronaut) {
        astronauts.remove(astronaut);
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

    // alerts  
    public List<Alert> getAlerts() {
        return alerts;
    }

    public void setAlerts(List<Alert> alerts) {
        this.alerts = alerts;
    }

    public void addAlert(Alert alert) {
        alerts.add(alert);
        alert.setLaunch(this);
    }

    public void removeAlert(Alert alert) {
        alerts.remove(alert);
        alert.setLaunch(null);
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "{" +
            " id:'" + getId() + "'" +
            ", missionName:'" + getMissionName() + "'" +
            ", lauchDate:'" + getLauchDate() + "'" +
            ", rocketId:'" + getRocketId() + "'" +
            ", address:'" + getAddress() + "'" +
            ", status:'" + getStatus() + "'" +
            "}";
    }
    
}
