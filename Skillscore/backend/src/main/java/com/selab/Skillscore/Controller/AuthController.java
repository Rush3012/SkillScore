package com.selab.Skillscore.Controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.selab.Skillscore.model.User;
import com.selab.Skillscore.repository.UserRepository;
import jakarta.servlet.http.HttpSession;

import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") 
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        System.out.println("is repo created");
        this.userRepository = userRepository;
    }

//     @PostMapping("/login")
// public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request, HttpSession session) {
//     try {
//         String email = request.get("email").trim().toLowerCase();
//         System.out.println("Normalized email: " + email);

//         if (!email.endsWith("@nitc.ac.in")) {
//             return ResponseEntity.status(403)
//                     .body(Collections.singletonMap("error", "Only @nitc.ac.in emails allowed"));
//         }

//         Optional<User> user = userRepository.findByUsername(email);
//         if (user.isEmpty()) {
//             return ResponseEntity.status(403)
//                     .body(Collections.singletonMap("error", "User not found"));
//         }

//         User loggedInUser = user.get();
//         session.setAttribute("userId", loggedInUser.getId()); 
//         session.setAttribute("userEmail", email);
//         session.setAttribute("userRole", loggedInUser.getRole());

//         return ResponseEntity.ok().body(Map.of(
//             "userId", loggedInUser.getId(),
//             "role", loggedInUser.getRole(),
//             "email", email
//         ));

//     } catch (Exception e) {
//         return ResponseEntity.status(500)
//                 .body(Collections.singletonMap("error", "Server error"));
//     }
// }

@PostMapping("/login")
public ResponseEntity<?> googleLogin(@RequestHeader("Authorization") String authHeader, 
                                   HttpSession session) {
    try {
        String idTokenString = authHeader.replace("Bearer ", "").trim();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
            new NetHttpTransport(), 
            new GsonFactory()
        ).setAudience(Collections.singletonList("572154029570-08ta74tbukt2mhm88f0jva6oaev9jqei.apps.googleusercontent.com"))
         .build();

        GoogleIdToken idToken = verifier.verify(idTokenString);
        if (idToken == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid Google token"));
        }

        Payload payload = idToken.getPayload();
        String email = payload.getEmail();
        
        // Rest of your existing logic
        if (!email.endsWith("@nitc.ac.in")) {
            return ResponseEntity.status(403)
                    .body(Map.of("error", "Only @nitc.ac.in emails allowed"));
        }

        Optional<User> user = userRepository.findByUsername(email);
        if (user.isEmpty()) {
            return ResponseEntity.status(403)
                    .body(Map.of("error", "User not found"));
        }

        User loggedInUser = user.get();
        session.setAttribute("userId", loggedInUser.getId());
        session.setAttribute("userEmail", email);
        session.setAttribute("userRole", loggedInUser.getRole());

         return ResponseEntity.ok().body(Map.of(
            "userId", loggedInUser.getId(),
            "role", loggedInUser.getRole(),
            "email", email
        ));

    } catch (Exception e) {
        return ResponseEntity.status(500)
                .body(Map.of("error", "Server error: " + e.getMessage()));
    }
}


@GetMapping("/profile")
public ResponseEntity<?> getProfile(HttpSession session) {
    Long userId = (Long) session.getAttribute("userId");
    String email = (String) session.getAttribute("userEmail");
    String role = (String) session.getAttribute("userRole");

    if (userId == null || email == null) {
        return ResponseEntity.status(401).body("Not authenticated");
    }

    return ResponseEntity.ok().body(Map.of(
        "userId", userId,
        "email", email,
        "role", role
    ));
}

@GetMapping("/check-session")
public ResponseEntity<?> checkSession(HttpSession session) {
    Long userId = (Long) session.getAttribute("userId");
    if (userId != null) {
        return ResponseEntity.ok().body(Map.of(
            "status", "authenticated",
            "userId", userId
        ));
    }
    return ResponseEntity.status(401).body(Collections.singletonMap("error", "Not authenticated"));
}

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok().body(Collections.singletonMap("status", "logged out"));
    }
}
