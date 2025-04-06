package com.selab.Skillscore.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.session.SimpleRedirectInvalidSessionStrategy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     private final CorsFilter corsFilter;

//     public SecurityConfig(CorsFilter corsFilter) {
//         this.corsFilter = corsFilter;
//     }

//     // SecurityConfig.java
// @Bean
// public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//     http
//         .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
//         .csrf(AbstractHttpConfigurer::disable)
//         .authorizeHttpRequests(auth -> auth
//             .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//             .requestMatchers(
//                 "/api/auth/**",
//                 "/api/events/**"
//             ).permitAll()
//             .requestMatchers("/api/students/**").authenticated()
//             .anyRequest().authenticated()
//         )
//         .sessionManagement(session -> session
//             .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
//             // .invalidSessionUrl("/login")
//         );
    
//     return http.build();
// }
// }


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/students/**").hasRole("STUDENT") // Use hasRole() which automatically adds ROLE_ prefix
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .successHandler((request, response, authentication) -> {
                    // This ensures proper session creation
                    response.setStatus(HttpStatus.OK.value());
                })
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                .invalidSessionStrategy(new SimpleRedirectInvalidSessionStrategy("/login"))
            );
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("*"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setExposedHeaders(List.of("Authorization", "Set-Cookie"));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}