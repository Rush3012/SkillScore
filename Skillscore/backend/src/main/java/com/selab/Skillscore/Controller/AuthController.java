package com.selab.Skillscore.Controller;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.selab.Skillscore.model.User;
import com.selab.Skillscore.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        Optional<User> userOptional = userService.findByUsername(loginRequest.getUsername());

        if (userOptional.isPresent() && userOptional.get().getPassword().equals(loginRequest.getPassword())) {
            User user = userOptional.get();
            session.setAttribute("loggedInUser", user);
            return ResponseEntity.ok(Map.of("message", "Login Successful", 
                    "role", user.getRole().name().toLowerCase(), 
                    "userId", user.getId()));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid username or password"));
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleAuth(@RequestBody Map<String, String> payload, HttpSession session) {
        String token = payload.get("token");

        if (token == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Invalid Google token"));
        }

        JsonFactory jsonFactory = new JacksonFactory();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(), jsonFactory)
                .setAudience(Collections.singletonList("572154029570-u807i33g3gk7f1cqpdc67mak92a6mpsi.apps.googleusercontent.com"))
                .build();

        try {
            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                GoogleIdToken.Payload payloadData = idToken.getPayload();
                String email = payloadData.getEmail();

                if (email.endsWith("@nitc.ac.in")) {
                    Optional<User> existingUser = userService.findByUsername(email);
                    if (existingUser.isPresent()) {
                        session.setAttribute("loggedInUser", existingUser.get());
                        return ResponseEntity.ok(Map.of("message", "Google Login Successful",
    "role", existingUser.get().getRole().name().toLowerCase(),
    "userId", existingUser.get().getId(),
    "email", existingUser.get().getUsername())); // Add this

                    }
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Email not registered in database"));
                }
            }
        } catch (GeneralSecurityException | IOException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid Google Token"));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Google authentication failed"));
    }

    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public String getPassword() { return password; }
    }
}
