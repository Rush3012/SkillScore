// package com.selab.Skillscore;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication
// public class SkillscoreApplication {

// 	public static void main(String[] args) {
// 		SpringApplication.run(SkillscoreApplication.class, args);
// 	}
	
// }

package com.selab.Skillscore;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class SkillscoreApplication {
    public static void main(String[] args) {
        SpringApplication.run(SkillscoreApplication.class, args);
    }
}

// ServletContextInitializer Implementation
@Component
class MyServletContextInitializer implements ServletContextInitializer {
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        System.out.println("ServletContext Initialized in Spring Boot 3+!");
        servletContext.setInitParameter("myCustomParam", "customValue");
    }
}
