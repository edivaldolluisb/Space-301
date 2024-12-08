package ies301.space.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
    private Date launchDate;
    @NotNull(message="Rocket is mandotory")
    private int rocketId;
    @NotBlank(message="Address is mandotory")
    private String address;

    private Status status = Status.PENDING;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "astronauts", joinColumns = @JoinColumn(name = "launch_id"))
    @Column(name = "astronaut_id")
    private Set<Long> astronauts = new HashSet<>();

    @OneToMany(mappedBy = "launch")
    private List<Alert> alerts;

    public Launch() {}
    
    public Launch(String missionName, Date launchDate, int rocketId, String address, Status status, Set<Long> astronauts) {


        this.missionName = missionName;
        this.launchDate = launchDate;
        this.rocketId = rocketId;
        this.address = address;

        this.status = status;

        this.astronauts = astronauts;
    }

    public double getId() {
        return id;
    }

    public Set<Long> getAstronauts() {
        return astronauts;
    }

    public void setAstronauts(Set<Long> astronauts) {
        this.astronauts = astronauts;
    }

    public void addAstronaut(Long astronaut) {
        astronauts.add(astronaut);
    }

    public void removeAstronaut(Long astronaut) {
        astronauts.remove(astronaut);
    }   

    public String getMissionName() {
        return missionName;
    }

    public void setMissionName(String missionName) {
        this.missionName = missionName;
    }

    public Date getLaunchDate() {
        return launchDate;
    }

    public void setLaunchDate(Date launchDate) {
        this.launchDate = launchDate;
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
            ", launchDate:'" + getLaunchDate() + "'" +
            ", rocketId:'" + getRocketId() + "'" +
            ", address:'" + getAddress() + "'" +
            ", status:'" + getStatus() + "'" +
            ", astronauts:" + getAstronauts() + "" +
            "}";
    }
    
}
