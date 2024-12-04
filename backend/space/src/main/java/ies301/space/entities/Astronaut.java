package  ies301.space.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.Random;

@Entity
@Table(name = "astronaut")
public class Astronaut {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String gender;
    private String photo;
    private int age;
    private float height;
    private double weight;

    private double heartRate;
    private double bloodPressure;
    private double bodyTemperature;
    private double respiratoryRate;

    @ManyToOne
    @JoinColumn(name = "launch_id")
    // @JsonIgnore
    private Launch launch;

    public Astronaut() {
        // Chamar os métodos de inicialização com valores aleatórios
        generateRandomName();
        generateRandomGender();
        generateRandomAge();
        generateRandomHeight();
        generateRandomWeight();

    }

    public Astronaut(String name, String gender, String photo, int age, float height, double weight) {
        this.name = name;
        this.gender = gender;
        this.photo = photo;
        this.age = age;
        this.height = height;
        this.weight = weight;
    }

    public double getBMI() {
        return weight / (height * height);
    }
    
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public Launch getLaunch() {
        return launch;
    }

    public void setLaunch(Launch launch) {
        this.launch = launch;
    }

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }

    public double getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(double heartRate) {
        this.heartRate = heartRate;
    }

    public double getBloodPressure() {
        return bloodPressure;
    }

    public void setBloodPressure(double bloodPressure) {
        this.bloodPressure = bloodPressure;
    }

    public double getBodyTemperature() {
        return bodyTemperature;
    }

    public void setBodyTemperature(double bodyTemperature) {
        this.bodyTemperature = bodyTemperature;
    }

    public double getRespiratoryRate() {
        return respiratoryRate;
    }

    public void setRespiratoryRate(double respiratoryRate) {
        this.respiratoryRate = respiratoryRate;
    }

    // Adicionar valores default para os campos de Nome, Gênero, Idade, Altura e Peso

    private void generateRandomName() {
        // Lógica para gerar um nome aleatório
        String[] firstNames = {"John", "Jane", "Alex", "Emily"};
        String[] lastNames = {"Doe", "Smith", "Johnson", "Williams"};
        Random random = new Random();
        int firstNameIndex = random.nextInt(firstNames.length);
        int lastNameIndex = random.nextInt(lastNames.length); 
        this.name = firstNames[firstNameIndex] + " " + lastNames[lastNameIndex];
    }

    private void generateRandomGender() {
        // Lógica para gerar um gênero aleatório
        Random random = new Random();
        this.gender = random.nextBoolean() ? "Male" : "Female";
    }

    private void generateRandomAge() {
        // Lógica para gerar uma idade aleatória dentro de um intervalo
        Random random = new Random();
        this.age = random.nextInt(80) + 20; // Idade entre 20 e 99
    }

    private void generateRandomHeight() {
        // Lógica para gerar uma altura aleatória em metros
        Random random = new Random();
        this.height = 1.5f + random.nextFloat() * 0.5f; // Altura entre 1.5 e 2.0 metros
    }

    private void generateRandomWeight() {
        // Lógica para gerar um peso aleatório em kg
        // A lógica pode ser mais complexa, considerando a altura e o gênero
        Random random = new Random();
        this.weight = 50 + random.nextDouble() * 50; // Peso entre 50 e 100 kg
    }

}