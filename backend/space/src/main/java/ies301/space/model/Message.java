package ies301.space.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Message {
    private String idLancamento;
    private List<Tripulante> tripulantes;
    private Nave nave;
    private boolean terminado;

    // Getters e Setters
    @JsonProperty("id_lancamento")
    public String getIdLancamento() {
        return idLancamento;
    }

    @JsonProperty("id_lancamento")
    public void setIdLancamento(String idLancamento) {
        this.idLancamento = idLancamento;
    }

    public List<Tripulante> getTripulantes() {
        return tripulantes;
    }

    public void setTripulantes(List<Tripulante> tripulantes) {
        this.tripulantes = tripulantes;
    }

    public Nave getNave() {
        return nave;
    }

    public void setNave(Nave nave) {
        this.nave = nave;
    }

    public boolean getTerminado() {
        return terminado;
    }

    public void setTerminado(boolean terminado) {
        this.terminado = terminado;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Tripulante {
        private Long id;
        private double paSistolica;
        private double paDiastolica;
        private double oxigenioSangue;
        private double bpm;
        private double temperature;
        private double respiracao;
        private List<Alerta> alertas;

        // Getters e Setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public double  getTemperature() {
            return temperature;
        }

        public void setTemperature(double temperature) {
            this.temperature = temperature;
        }

        @JsonProperty("pa_sistolica")
        public double getPaSistolica() {
            return paSistolica;
        }

        @JsonProperty("pa_sistolica")
        public void setPaSistolica(double paSistolica) {
            this.paSistolica = paSistolica;
        }

        @JsonProperty("pa_diastolica")
        public double getPaDiastolica() {
            return paDiastolica;
        }

        @JsonProperty("pa_diastolica")
        public void setPaDiastolica(double paDiastolica) {
            this.paDiastolica = paDiastolica;
        }

        @JsonProperty("oxigenio_sangue")
        public double getOxigenioSangue() {
            return oxigenioSangue;
        }

        @JsonProperty("oxigenio_sangue")
        public void setOxigenioSangue(double oxigenioSangue) {
            this.oxigenioSangue = oxigenioSangue;
        }

        public double getBpm() {
            return bpm;
        }

        public void setBpm(double bpm) {
            this.bpm = bpm;
        }

        public double getRespiracao() {
            return respiracao;
        }

        public void setRespiracao(double respiracao) {
            this.respiracao = respiracao;
        }

        public List<Alerta> getAlertas() {
            return alertas;
        }

        public void setAlertas(List<Alerta> alertas) {
            this.alertas = alertas;
        }

        @Override
        public String toString() {
            return "Tripulante [id=" + id + ", paSistolica=" + paSistolica + ", paDiastolica=" + paDiastolica
                    + ", oxigenioSangue=" + oxigenioSangue + ", bpm=" + bpm + ", temperature=" + temperature
                    + ", respiracao=" + respiracao + ", alertas=" + alertas + "]";
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Nave {
        private double altitude;
        private double velocidade;
        private double velocidadeX;
        private double aceleracao;
        private double forcaG;
        private double pressaoAtual;
        private double temperaturaAtual;
        private double temperaturaMotorAtual;
        private double temperaturaExternaAtual;
        private double combustivel;
        private double qualidadeAtual;
        private double oxigenioAtual;
        private double energiaAtual;
        private List<Alerta> alerta;

        // Getters e Setters
        public double getAltitude() {
            return altitude;
        }

        public void setAltitude(double altitude) {
            this.altitude = altitude;
        }

        public double getVelocidade() {
            return velocidade;
        }

        public void setVelocidade(double velocidade) {
            this.velocidade = velocidade;
        }

        public List<Alerta> getAlertas() {
            return alerta;
        }

        public void setAlertas(List<Alerta> alerta) {
            this.alerta = alerta;
        }

        @JsonProperty("velocidade_x")
        public double getVelocidadeX() {
            return velocidadeX;
        }

        @JsonProperty("velocidade_x")
        public void setVelocidadeX(double velocidadeX) {
            this.velocidadeX = velocidadeX;
        }

        public double getAceleracao() {
            return aceleracao;
        }

        public void setAceleracao(double aceleracao) {
            this.aceleracao = aceleracao;
        }

        @JsonProperty("forca_g")
        public double getForcaG() {
            return forcaG;
        }

        @JsonProperty("forca_g")
        public void setForcaG(double forcaG) {
            this.forcaG = forcaG;
        }

        @JsonProperty("pressao_atual")
        public double getPressaoAtual() {
            return pressaoAtual;
        }

        @JsonProperty("pressao_atual")
        public void setPressaoAtual(double pressaoAtual) {
            this.pressaoAtual = pressaoAtual;
        }

        @JsonProperty("temperatura_atual")
        public double getTemperaturaAtual() {
            return temperaturaAtual;
        }

        @JsonProperty("temperatura_atual")
        public void setTemperaturaAtual(double temperaturaAtual) {
            this.temperaturaAtual = temperaturaAtual;
        }

        @JsonProperty("temperatura_motor_atual")
        public double getTemperaturaMotorAtual() {
            return temperaturaMotorAtual;
        }

        @JsonProperty("temperatura_motor_atual")
        public void setTemperaturaMotorAtual(double temperaturaMotorAtual) {
            this.temperaturaMotorAtual = temperaturaMotorAtual;
        }

        @JsonProperty("temperatura_externa_atual")
        public double getTemperaturaExternaAtual() {
            return temperaturaExternaAtual;
        }

        @JsonProperty("temperatura_externa_atual")
        public void setTemperaturaExternaAtual(double temperaturaExternaAtual) {
            this.temperaturaExternaAtual = temperaturaExternaAtual;
        }

        public double getCombustivel() {
            return combustivel;
        }

        public void setCombustivel(double combustivel) {
            this.combustivel = combustivel;
        }

        @JsonProperty("qualidade_atual")
        public double getQualidadeAtual() {
            return qualidadeAtual;
        }

        @JsonProperty("qualidade_atual")
        public void setQualidadeAtual(double qualidadeAtual) {
            this.qualidadeAtual = qualidadeAtual;
        }

        @JsonProperty("oxigenio_atual")
        public double getOxigenioAtual() {
            return oxigenioAtual;
        }

        @JsonProperty("oxigenio_atual")
        public void setOxigenioAtual(double oxigenioAtual) {
            this.oxigenioAtual = oxigenioAtual;
        }

        @JsonProperty("energia_atual")
        public double getEnergiaAtual() {
            return energiaAtual;
        }

        @JsonProperty("energia_atual")
        public void setEnergiaAtual(double energiaAtual) {
            this.energiaAtual = energiaAtual;
        }

        public List<Alerta> getAlerta() {
            return alerta;
        }

        public void setAlerta(List<Alerta> alerta) {
            this.alerta = alerta;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Alerta {
        private String parametro;
        private String nomeAlerta;

        private Boolean status;

        @JsonProperty("alerta_nome")
        private String alertaNome;

        @JsonProperty("alerta_descricao")
        private String alertaDescricao;

        // Getters e Setters
        public String getParametro() {
            return parametro;
        }

        public void setParametro(String parametro) {
            this.parametro = parametro;
        }

        @JsonProperty("nome_alerta")
        public String getNomeAlerta() {
            return nomeAlerta;
        }

        @JsonProperty("nome_alerta")
        public void setNomeAlerta(String nomeAlerta) {
            this.nomeAlerta = nomeAlerta;
        }

        public String getAlertaNome() {
            return alertaNome;
        }

        public void setAlertaNome(String alertaNome) {
            this.alertaNome = alertaNome;
        }

        public String getAlertaDescricao() {
            return alertaDescricao;
        }

        public void setAlertaDescricao(String alertaDescricao) {
            this.alertaDescricao = alertaDescricao;
        }

        public Boolean getStatus() {
            return status;
        }

        public void setStatus(Boolean status) {
            this.status = status;
        }

    }
}
