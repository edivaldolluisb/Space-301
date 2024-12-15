package ies301.space;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DotenvConfig {

    @Bean
    public Dotenv dotenv() {
        System.out.println("Tentando carregar o arquivo .env em /app");
        Dotenv dotenv = Dotenv.configure()
            .filename(".env")
            .directory("/app")
            .load();
        return dotenv;
    }
}
