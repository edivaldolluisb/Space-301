package ies301.space.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "foguete")
public class Rocket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int capacity;
    private double weight;
    private int numAstronauts;
    private double height;
    private double diameter;
    private String originCountry;

    public Rocket() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getCapacity() {
        return capacity;
    }

    public double getWeight() {
        return weight;
    }

    public int getNumAstronauts() {
        return numAstronauts;
    }

    public double getHeight() {
        return height;
    }

    public double getDiameter() {
        return diameter;
    }

    public String getOriginCountry() {
        return originCountry;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public void setNumAstronauts(int numAstronauts) {
        this.numAstronauts = numAstronauts;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public void setDiameter(double diameter) {
        this.diameter = diameter;
    }

    public void setOriginCountry(String originCountry) {
        this.originCountry = originCountry;
    }

}
