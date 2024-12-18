package ies301.space.infra.WebSocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Configura o broker para tópicos e destinos de aplicação
        config.enableSimpleBroker("/topic"); // Para broadcasting
        config.setApplicationDestinationPrefixes("/app"); // Para mensagens enviadas ao servidor
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Registra o endpoint para conexões WebSocket
        registry.addEndpoint("/space-websocket")
                .setAllowedOrigins("*");
    }
}