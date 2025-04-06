
package com.selab.Skillscore.Controller;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.selab.Skillscore.dto.PasswordChangeRequest;
import com.selab.Skillscore.model.User;
import com.selab.Skillscore.repository.UserRepository;
import com.selab.Skillscore.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        Optional<User> userOptional = userService.findByUsername(loginRequest.getUsername());

        if (userOptional.isPresent() && userOptional.get().getPassword().equals(loginRequest.getPassword())) { 
            User user = userOptional.get();

            UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(), // principal
                        null,               // no credentials needed now
                        List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
                );

            SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authenticationToken);
        request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, context);

        // Step 3: Also set your own session attribute (if you still want it)
        request.getSession().setAttribute("loggedInUser", user);
            
        // System.out.println("User logged in: " + user.getUsername());
        // System.out.println("Session Created! Session ID: " + session.getId());
        // System.out.println("Session Attribute Set: " + session.getAttribute("loggedInUser"));
 

            return ResponseEntity.ok(Map.of(
                "message", "Login Successful",
                "role", user.getRole().name().toLowerCase(),
                "userId", user.getId()
            ));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid username or password"));
    }
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");

        System.out.println("Profile API Called!");
        System.out.println("Session ID: " + session.getId());
        System.out.println("Session Attribute1: " + session.getAttribute("loggedInUser"));
        System.out.println("Session Attribute2: " + loggedInUser);

    
        if (loggedInUser == null) {
            System.out.println("No user found in session!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No active session"));
        }

        return ResponseEntity.ok(Map.of(
            "username", loggedInUser.getUsername(),
            "role", loggedInUser.getRole().name().toLowerCase(),
            "userId", loggedInUser.getId()
        ));
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserFromSession(HttpSession session) {
        Object userObj = session.getAttribute("loggedInUser");

        if (userObj instanceof User user) {
            return ResponseEntity.ok(Map.of(
                "userId", user.getId(),
                "role", user.getRole().name().toLowerCase()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "User not logged in"));
        }
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.getSession().invalidate(); // Invalidate session
        response.setStatus(HttpServletResponse.SC_OK);
    }
    
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // Direct string comparison for plain-text password
        if (!request.getCurrentPassword().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Incorrect current password!"));
        }

        // Directly setting new password in plain text
        user.setPassword(request.getNewPassword());
        userRepository.save(user);

        return ResponseEntity.ok(Collections.singletonMap("message", "Password changed successfully!"));
    }


    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public String getPassword() { return password; }
    }
}

