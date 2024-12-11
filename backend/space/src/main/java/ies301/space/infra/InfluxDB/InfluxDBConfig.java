package ies301.space.infra.InfluxDB;

import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.dto.Pong;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import com.influxdb.client.WriteApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class InfluxDBConfig {
    private static final Logger LOG = LoggerFactory.getLogger(InfluxDBConfig.class);

    private static final String TOKEN = "MyInitialAdminToken0==";
    private static final String BUCKET = "home";
    private static final String ORG = "docs";
    private static final String URL = "http://localhost:8086";

    @Bean
    public InfluxDBClient influxDBClient() {
        return InfluxDBClientFactory.create(URL, TOKEN.toCharArray(), ORG, BUCKET);
    }
       
}
