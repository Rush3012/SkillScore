// package com.selab.Skillscore.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.crypto.password.NoOpPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;

// @Configuration
// public class SecurityConfig {
    
//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return NoOpPasswordEncoder.getInstance(); // ⚠ Plain text passwords (Not recommended for production)
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .authorizeHttpRequests(auth -> auth
//                 .anyRequest().permitAll() // Allow all requests without authentication
//             )
//             .formLogin(login -> login
//                 .loginPage("/login") // ✅ Use your custom Thymeleaf login page
//                 .defaultSuccessUrl("/student/dashboard", true) // Redirect on success
//                 .permitAll()
//             )
//             .logout(logout -> logout
//                 .logoutUrl("/logout")
//                 .logoutSuccessUrl("/login?logout")
//                 .permitAll()
//             );

//         return http.build();
//     }
// }


// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.Customizer;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {
    
//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(AbstractHttpConfigurer::disable)  // Disable CSRF for testing APIs
//             .authorizeHttpRequests(auth -> auth
//                 .anyRequest().permitAll() // Allow all requests without authentication
//             )
//             .formLogin(Customizer.withDefaults()) // Use default form login configuration
//             .logout(Customizer.withDefaults()); // Use default logout configuration

//         return http.build();
//     }
// }

// package com.selab.Skillscore.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {
    
//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(AbstractHttpConfigurer::disable)  // Disable CSRF for testing APIs
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/register", "/login", "/css/**", "/js/**").permitAll() // Allow these without authentication
//                 .anyRequest().authenticated()
//             )
//             .formLogin(login -> login
//                 .loginPage("/login") // Specify custom login page
//                 .defaultSuccessUrl("/student-dashboard", true) // Redirect on success
//                 .permitAll()
//             )
//             .logout(logout -> logout
//                 .logoutUrl("/logout")
//                 .logoutSuccessUrl("/login?logout")
//                 .permitAll()
//             );

//         return http.build();
//     }
// }

// package com.selab.Skillscore.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {
    
//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(AbstractHttpConfigurer::disable)  // Disable CSRF for testing APIs
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/register", "/css/**", "/js/**", "/student-dashboard", "/student/dashboard").permitAll() // Allow these without authentication
//                 .anyRequest().authenticated()
//             )
//             .formLogin(login -> login
//                 .loginPage("/login") // Specify custom login page
//                 .loginProcessingUrl("/perform_login") // This ensures login form posts to this endpoint
//                 .defaultSuccessUrl("/student-dashboard", true) // Redirect on success
//                 .failureUrl("/login?error=true")  // Redirect if login fails
//                 .permitAll()
//             )
//             .logout(logout -> logout
//                 .logoutUrl("/logout")
//                 .logoutSuccessUrl("/login?logout=true")
//                 .permitAll()
//             );

//         return http.build();
//     }
// }

package com.selab.Skillscore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)  // Disable CSRF for testing APIs
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/register", "/css/**", "/js/**").permitAll() // Allow public access to resources
                .requestMatchers("/student/dashboard").hasAuthority("STUDENT") // Restrict to students
                .requestMatchers("/faculty/dashboard").hasAuthority("FACULTY") // Restrict to faculty
                .anyRequest().authenticated() // All other routes require authentication
            )
            .formLogin(login -> login
                .loginPage("/login") // Specify custom login page
                .loginProcessingUrl("/perform_login") // Endpoint for form login
                .successHandler((request, response, authentication) -> {
                    // Determine user role and redirect accordingly
                    String role = authentication.getAuthorities().iterator().next().getAuthority();
                    if (role.equals("STUDENT")) {
                        response.sendRedirect("/student/dashboard");
                    } else if (role.equals("FACULTY")) {
                        response.sendRedirect("/faculty/dashboard");
                    } else {
                        response.sendRedirect("/login?error=role");
                    }
                })
                .failureUrl("/login?error=true")  // Redirect if login fails
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout=true")
                .permitAll()
            );

        return http.build();
    }
}
