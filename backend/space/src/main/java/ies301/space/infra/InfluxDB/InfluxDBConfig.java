package ies301.space.infra.InfluxDB;

import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.dto.Pong;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import com.influxdb.client.WriteApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class InfluxDBConfig {
    private static final Logger LOG = LoggerFactory.getLogger(InfluxDBConfig.class);


    @Value("${spring.influx.url:http://localhost:8086}")
    private String url;

    @Value("${spring.influx.token:MyInitialAdminToken0==}")
    private String token;

    @Value("${spring.influx.org:docs}")
    private String org;

    @Value("${spring.influx.bucket:home}")
    private String bucket;

    @Bean
    public InfluxDBClient influxDBClient() {
        return InfluxDBClientFactory.create(url, token.toCharArray(), org, bucket);
    }

    @Bean
    public WriteApi writeApi(InfluxDBClient influxDBClient) {
        return influxDBClient.getWriteApi();
    }
       
}
