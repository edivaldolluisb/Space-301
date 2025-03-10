package ies301.space;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;

@EnableRabbit
@SpringBootApplication
@EnableScheduling
@OpenAPIDefinition(info = @Info(title = "Space API", version = "1.0", description = "Documentação da API"))
public class SpaceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpaceApplication.class, args);
	}

}
