package ies301.space.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class HistoryLaunch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;
    @OneToOne
    @JoinColumn(name = "launch_id")
    private Launch launch;
    private List<Double> velocity;
    private List<Double> aceleration;
    private List<Double> fuel;
    private List<Double> intern_temperature;
    private List<Double> extern_temperature;
    private List<Double> height;
    private List<Double> g_force;
    private List<Double> radiation;

    public HistoryLaunch() {}

    public HistoryLaunch(Launch launch) {
        this.launch = launch;
    }

    public Long getHistoryId() {
        return historyId;
    }

    public void setHistoryId(Long historyId) {
        this.historyId = historyId;
    }

    public Launch getLaunch() {
        return launch;
    }

    public void setLaunch(Launch launch) {
        this.launch = launch;
    }

    public List<Double> getVelocity() {
        return velocity;
    }

    public void setVelocity(List<Double> velocity) {
        this.velocity = velocity;
    }

    public List<Double> getAceleration() {
        return aceleration;
    }

    public void setAceleration(List<Double> aceleration) {
        this.aceleration = aceleration;
    }

    public List<Double> getFuel() {
        return fuel;
    }

    public void setFuel(List<Double> fuel) {
        this.fuel = fuel;
    }

    public List<Double> getIntern_temperature() {
        return intern_temperature;
    }

    public void setIntern_temperature(List<Double> intern_temperature) {
        this.intern_temperature = intern_temperature;
    }

    public List<Double> getExtern_temperature() {
        return extern_temperature;
    }

    public void setExtern_temperature(List<Double> extern_temperature) {
        this.extern_temperature = extern_temperature;
    }

    public List<Double> getHeight() {
        return height;
    }

    public void setHeight(List<Double> height) {
        this.height = height;
    }

    public List<Double> getG_force() {
        return g_force;
    }

    public void setG_force(List<Double> g_force) {
        this.g_force = g_force;
    }

    public List<Double> getRadiation() {
        return radiation;
    }

    public void setRadiation(List<Double> radiation) {
        this.radiation = radiation;
    }
}
