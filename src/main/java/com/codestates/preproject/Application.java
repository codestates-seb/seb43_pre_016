package com.codestates.preproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing //Auditable 사용시 추가
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}


}
