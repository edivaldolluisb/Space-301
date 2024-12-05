package ies301.space.broker;

import org.springframework.amqp.core.Queue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BrokerConfig {

    @Value("launchQueue")
    private String launch;

    @Value("generatorQueue")
    private String generator;

    @Bean
    public Queue queue() {
        return new Queue(launch, true);
    }

    @Bean
    public Queue generatorQueue() {
        return new Queue(generator, true);
    }
}
