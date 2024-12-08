package ies301.space.entities;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "alert")
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message="Alert's message is mandotory")
    private String message;
    @NotNull(message="Date is mandotory")
    private Date date; 
    
    private boolean status = false;
    
    @ManyToOne 
    @JoinColumn(name = "launch_id")
    private Launch launch;

    public Alert() {
    }

    public Alert(String message, Launch launch) {
        this.message = message;
        this.launch = launch;
    }

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Launch getLaunch() {
        return launch;
    }

    public void setLaunch(Launch launch) {
        this.launch = launch;
    }

    @Override
    public String toString() {
        return "Alert [date=" + date + ", id=" + id + ", launch=" + launch + ", message=" + message + ", status="
                + status + "]";
    }

    
}
