package ies301.space.models;

import java.time.LocalDateTime;

import ies301.space.entities.Launch;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

/*
 * Dados para a tabela de alertas:
 * 
 * message: texto do alerta
 * createdAt: data de criação do alerta
 * viewed: se o alerta foi visualizado
 * rocket_id (FK): foguete associado ao alerta
 * 
 */

@Entity
@Table(name = "alerts")
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String message;

    // creation date, default to current date
    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private boolean viewed = false;

    @ManyToOne
    @JoinColumn(name = "lauch")
    private Launch lauch; // TODO: review

    public Alert(String message) {
        this.message = message;
    }

    public Alert(String message, boolean viewed) {
        this.message = message;
        this.viewed = viewed;
    }

    public Alert(String message, boolean viewed, LocalDateTime createdAt) {
        this.message = message;
        this.viewed = viewed;
        this.createdAt = createdAt;
    }

    public Alert(String message, Launch lauch) {
        this.message = message;
        this.lauch = lauch;
    }

    public Alert() {

    }

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public boolean isViewed() {
        return viewed;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setViewed(boolean viewed) {
        this.viewed = viewed;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Launch getLauch() {
        return lauch;
    }

    
    
}
