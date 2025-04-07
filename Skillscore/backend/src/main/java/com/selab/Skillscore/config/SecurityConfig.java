package com.selab.Skillscore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {

    private final CustomOAuth2SuccessHandler successHandler;

    // Constructor injection
    public SecurityConfig(CustomOAuth2SuccessHandler successHandler) {
        this.successHandler = successHandler;
    }

    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable()) // Disable CSRF for API-based login
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/", "/login", "/public/**",
                    "/api/auth/login", // your manual login endpoint
                    "/api/auth/user", "/api/auth/profile",
                    "/oauth2/**", "/login/oauth2/**"
                ).permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth -> oauth
                .successHandler(successHandler)
            )
            .logout(logout -> logout
                .logoutUrl("/api/auth/logout")
                .logoutSuccessHandler((request, response, authentication) -> {
                    response.setStatus(HttpServletResponse.SC_OK);
                })
            );

        return http.build();
    }


}


// @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(csrf -> csrf.disable()) // ✅ disable CSRF
//             .cors(Customizer.withDefaults())
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/", "/login", "/public/**", "/api/**", "/**", "/api/auth/user", "/api/auth/profile").permitAll()
//                 .anyRequest().authenticated()
//             )
//             .oauth2Login(oauth -> oauth
//                 .successHandler(successHandler)
//             )
//             .logout(logout -> logout
//                 .logoutUrl("/api/auth/logout")
//                 .logoutSuccessHandler((request, response, authentication) -> {
//                     response.setStatus(HttpServletResponse.SC_OK);
//                 })
//             );
//         return http.build();
//     }
