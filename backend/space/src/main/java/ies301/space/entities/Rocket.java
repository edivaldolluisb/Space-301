package ies301.space.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="rocket")
public class Rocket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int capacity;
    private double weigth;
    private int num_astronauts;
    private double height;
    private double diameter;
    private String origin_country;

    public Rocket() {}

    public Rocket(String name, int capacity, double weigth, int num_astronauts, double height, double diameter, String origin_country) {
        this.name = name;
        this.capacity = capacity;
        this.weigth = weigth;
        this.num_astronauts = num_astronauts;
        this.height = height;
        this.diameter = diameter;
        this.origin_country = origin_country;
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

    public double getWeigth() {
        return weigth;
    }

    public int getNum_astronauts() {
        return num_astronauts;
    }

    public double getHeight() {
        return height;
    }

    public double getDiameter() {
        return diameter;
    }

    public String getOrigin_country() {
        return origin_country;
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

    public void setWeigth(double weigth) {
        this.weigth = weigth;
    }

    public void setNum_astronauts(int num_astronauts) {
        this.num_astronauts = num_astronauts;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public void setDiameter(double diameter) {
        this.diameter = diameter;
    }

    public void setOrigin_country(String origin_country) {
        this.origin_country = origin_country;
    }

}