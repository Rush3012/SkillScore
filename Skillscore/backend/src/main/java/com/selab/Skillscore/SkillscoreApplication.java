package com.selab.Skillscore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.selab.Skillscore") 
public class SkillscoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(SkillscoreApplication.class, args);
	}
	
}




