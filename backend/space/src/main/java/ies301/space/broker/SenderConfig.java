package ies301.space.broker;

import org.springframework.amqp.core.Queue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SenderConfig {

    @Value("launchQueue")
    private String message;

    @Bean
    public Queue queue() {
        return new Queue(message, true);
    }

    @Bean
    public Queue generatorQueue() {
        return new Queue("generatorQueue", true); // Fila para mensagens do gerador
    }

    // @Bean
    // public Queue launchDataQueue() {
    //     return new Queue("launch_data", true);
    // }

    // @Bean
    // public Queue launchGenerateQueue() {
    //     return new Queue("launch_generate", true);
    // }

}
