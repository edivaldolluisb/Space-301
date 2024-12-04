package ies301.space.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "company")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="Company's name is mandotory")
    private String nome;
    @NotBlank(message="Company's email is mandotory")
    private String email;
    @NotBlank(message="Company's address is mandotory")
    private String endereco;
    @NotBlank(message="Company's access key is mandotory")
    private String chaveAcesso;

    public Company(){}

    public Company(String nome, String email, String endereco, String chaveAcesso) {
        this.nome = nome;
        this.email = email;
        this.endereco = endereco;
        this.chaveAcesso = chaveAcesso;
    }

    // Getters e setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getChaveAcesso() {
        return chaveAcesso;
    }

    public void setChaveAcesso(String chaveAcesso) {
        this.chaveAcesso = chaveAcesso;
    }
}
