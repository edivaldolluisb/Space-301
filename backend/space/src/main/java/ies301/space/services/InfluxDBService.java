package ies301.space.services;

import com.influxdb.client.DeleteApi;
import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.QueryApi;
import com.influxdb.client.WriteApi;
import com.influxdb.client.domain.WritePrecision;
import com.influxdb.client.write.Point;
import com.influxdb.query.FluxRecord;
import com.influxdb.query.FluxTable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ies301.space.model.Message;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InfluxDBService {

    private static final Logger logger = LoggerFactory.getLogger(InfluxDBService.class);

    @Autowired
    private InfluxDBClient influxDBClient;

    @Autowired
    private WriteApi writeApi;

    public void saveDataToInfluxDB(Message message) {

        logger.info("Salvando dados no InfluxDB para lançamento ID {}", message.getIdLancamento());
        // logger.info("Dados: {}", message.getTripulantes());
        // return;

        // try (WriteApi writeApi = influxDBClient.getWriteApi()) {
        try {
            // Salvar dados de tripulantes
            message.getTripulantes().forEach(tripulante -> {
                logger.info("Salvando dados do tripulante ID {}", tripulante.getId());
                Point point = Point
                        .measurement("tripulantes")
                        .addTag("lancamentoId", message.getIdLancamento())
                        .addTag("id", String.valueOf(tripulante.getId()))
                        .addField("temperature", tripulante.getTemperature())
                        .addField("paSistolica", tripulante.getPaSistolica())
                        .addField("paDiastolica", tripulante.getPaDiastolica())
                        .addField("oxigenioSangue", tripulante.getOxigenioSangue())
                        .addField("bpm", tripulante.getBpm())
                        .addField("respiracao", tripulante.getRespiracao())
                        .time(System.currentTimeMillis(), WritePrecision.MS);
                writeApi.writePoint(point);
            });

            // Salvar dados da nave
            Point navePoint = Point
                    .measurement("nave")
                    .addTag("lancamentoId", message.getIdLancamento())
                    .addField("altitude", message.getNave().getAltitude())
                    .addField("velocidade", message.getNave().getVelocidade())
                    .addField("pressaoAtual", message.getNave().getPressaoAtual())
                    .addField("temperaturaAtual", message.getNave().getTemperaturaAtual())
                    .addField("oxigenioAtual", message.getNave().getOxigenioAtual())
                    .addField("temperaturaExterna", message.getNave().getTemperaturaExternaAtual())
                    .time(System.currentTimeMillis(), WritePrecision.MS);
            writeApi.writePoint(navePoint);

            logger.info("Dados salvos no InfluxDB com sucesso!");
        } catch (Exception e) {
            logger.error("Erro ao salvar dados no InfluxDB para lançamento ID {}: ", message.getIdLancamento(), e);
        }

    }

    public List<FluxTable> queryData(String query) {
        QueryApi queryApi = influxDBClient.getQueryApi();
        try {
            // Executa a consulta no InfluxDB
            List<FluxTable> tables = queryApi.query(query);
            return tables;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao executar consulta no InfluxDB", e);
        }
    }

    public List<Map<String, Object>> queryInfluxData(String measurement, Long lancamentoId) {
        String query = String.format("""
                    from(bucket: "%s")
                        |> range(start: -1d)
                        |> filter(fn: (r) => r._measurement == "%s" and r.lancamentoId == "%s")
                        |> filter(fn: (r) => r._field == "altitude" or r._field == "velocidade" or
                    r._field == "pressaoAtual" or r._field == "temperaturaAtual" or
                    r._field == "oxigenioAtual")
                        |> group(columns: ["_field"])
                """, "home", measurement, lancamentoId);

        QueryApi queryApi = influxDBClient.getQueryApi();
        List<FluxTable> tables = queryApi.query(query);

        List<Map<String, Object>> results = new ArrayList<>();
        for (FluxTable table : tables) {
            for (FluxRecord record : table.getRecords()) {
                results.add(record.getValues());
            }
        }
        return results;
    }

    public void deleteMeasurementData(String bucket, String org, String measurement) {

        DeleteApi deleteApi = influxDBClient.getDeleteApi();

        // Define o intervalo de tempo para deletar (ajuste conforme necessário)
        OffsetDateTime start = Instant.parse("1970-01-01T00:00:00Z").atOffset(ZoneOffset.UTC);
        OffsetDateTime stop = Instant.now().atOffset(ZoneOffset.UTC);

        // Cria o predicado para filtrar os dados por medição
        String predicate = "_measurement=\"" + measurement + "\"";

        // Executa a exclusão
        try {
            deleteApi.delete(start, stop, predicate, bucket, org);
            System.out.println("Dados apagados para measurement: " + measurement);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao apagar dados do InfluxDB", e);
        }
    }

    // pegar dados da nave
    public List<Map<String, Object>> fetchNaveData(Long lancamentoId, String field) {
        String query = String.format("""
                    from(bucket: "%s")
                      |> range(start: -1d)
                      |> filter(fn: (r) => r._measurement == "nave" and r.lancamentoId == "%s" and r._field == "%s")
                        |> aggregateWindow(every: 2m, fn: mean, createEmpty: false)
                        |> yield(name: "mean")
                """, "home", lancamentoId, field);

        return executeInfluxQuery(query);
    }

    // pegar dados de um tripulante específico
    public List<Map<String, Object>> fetchTripulanteData(Long lancamentoId, Long tripulanteId, String field) {
        String query = String.format(
                """
                            from(bucket: "%s")
                              |> range(start: -1d)
                              |> filter(fn: (r) => r._measurement == "tripulantes" and 
                              r.lancamentoId == "%s" and 
                              r.id == "%s" and 
                              r._field == "%s")
                        """,
                "home", lancamentoId, tripulanteId, field);

        return executeInfluxQuery(query);
    }

    private List<Map<String, Object>> executeInfluxQuery(String query) {
        QueryApi queryApi = influxDBClient.getQueryApi();
        List<FluxTable> tables = queryApi.query(query);

        List<Map<String, Object>> results = new ArrayList<>();
        for (FluxTable table : tables) {
            for (FluxRecord record : table.getRecords()) {
                results.add(Map.of(
                        "_field", record.getValueByKey("_field"),
                        "_value", record.getValueByKey("_value"),
                        "_time", record.getValueByKey("_time")));
            }
        }
        return results;
    }

    // public List<Map<String, Object>> getAveragedData(Long launchId, String
    // entity, Long entityId, String field, String interval) {
    // // Criar a consulta para calcular a média por intervalo
    // String query = String.format("""
    // from(bucket: "home")
    // |> range(start: -1h) // Última hora (ajuste conforme necessário)
    // |> filter(fn: (r) => r._measurement == "%s" and r.lancamentoId == "%s" and
    // r._field == "%s")
    // %s
    // |> aggregateWindow(every: %s, fn: mean, createEmpty: false)
    // |> yield(name: "mean")
    // """,
    // entity, launchId, field,
    // (entityId != null ? "and r.id == \"" + entityId + "\"" : ""), // Filtro
    // opcional para ID do tripulante
    // interval);

    // QueryApi queryApi = influxDBClient.getQueryApi();
    // List<FluxTable> tables = queryApi.query(query);

    // // Processar os resultados
    // List<Map<String, Object>> results = new ArrayList<>();
    // for (FluxTable table : tables) {
    // for (FluxRecord record : table.getRecords()) {
    // results.add(Map.of(
    // "_field", field,
    // "_value", record.getValueByKey("_value"),
    // "_time", record.getValueByKey("_time")
    // ));
    // }
    // }
    // return results;
    // }

}
